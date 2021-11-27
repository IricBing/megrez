# emqx_auth_http

[官方文档](https://docs.emqx.cn/broker/latest/advanced/auth-http.html)

## 用途

`emqx_auth_http` 插件用于 `HTTP` 认证，使用外部自建 `HTTP` 应用认证数据源，根据 `HTTP API` 返回的数据判定认证结果，能够实现复杂的认证鉴权逻辑。

## 认证原理

`EMQ X` 在设备连接事件中使用当前客户端相关信息作为参数，向用户自定义的认证服务发起请求查询权限，通过返回的 `HTTP` **响应状态码** (HTTP statusCode) 来处理认证请求。

* **认证失败**：`API` 返回 `4xx` 状态码
* **认证成功**：`API` 返回 `200` 状态码
* **忽略认证**：`API` 返回 `200` 状态码且消息体 `ignore`

## 认证请求

进行身份认证时， `EMQ X` 将使用当前客户端信息填充并发起用户配置的认证查询请求，查询出该客户端在 `HTTP` 服务器端的认证数据。

`HTTP` 请求方法为 `GET` 时，请求参数将以 `URL` 查询字符串的形式传递； `POST` 、 `PUT` 请求则将请求参数以**普通表单**形式或者以 `Json` 形式提交（由 `content-type` 的值决定）。

你可以在认证请求中使用以下**占位符**，请求时 `EMQ X` 将自动填充为客户端信息：

|占位符|信息|
|-----|-----|
| `%u` |用户名|
| `%c` |Client ID|
| `%a` |客户端 `IP` 地址|
| `%r` |客户端接入协议|
| `%P` |明文密码|
| `%p` |客户端端口|
| `%C` | `TLS` 证书公用名（证书的域名或子域名），仅当 `TLS` 连接时有效|
| `%d` | `TLS` 证书 `subject` ，仅当 `TLS` 连接时有效|

> [!tip|label:提示]
> 推荐使用 `POST` 与 `PUT` 方法，使用 `GET` 方法时**明文密码**可能会随 `URL` 被记录到传输过程中的服务器日志中。


## 插件配置

在 `docker-compose.yaml` 中的配置:

```yaml {31-46}
version: '3.8'

volumes:
  vol-emqx-data:

    name: emqx-data

  vol-emqx-etc:

    name: emqx-etc

  vol-emqx-log:

    name: emqx-log

services:
  emqx:

    image: emqx/emqx:4.3.4
    container_name: emqx
    restart: always
    network_mode: host
    pid: host
    volumes:

      - vol-emqx-data:/opt/emqx/data
      - vol-emqx-etc:/opt/emqx/etc
      - vol-emqx-log:/opt/emqx/log
      - /etc/localtime:/etc/localtime:ro
    environment:
      EMQX_ALLOW_ANONYMOUS: 'false' # 禁止匿名连接
      EMQX_ACL_NOMATCH: deny  # ACL未命中时，拒绝 发布/订阅 操作
      EMQX_ENABLE_ACL_CACHE: 'off'  # 关闭ACL鉴权缓存
      # http auth 插件配置
      EMQX_AUTH__HTTP__AUTH_REQ__URL: http://127.0.0.1:3000/emqx/auth
      EMQX_AUTH__HTTP__AUTH_REQ__METHOD: post
      EMQX_AUTH__HTTP__AUTH_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__AUTH_REQ__PARAMS: client_id=%c,username=%u,password=%P,ip_address=%a,protocol=%r
      EMQX_AUTH__HTTP__SUPER_REQ__URL: http://127.0.0.1:3000/emqx/superuser
      EMQX_AUTH__HTTP__SUPER_REQ__METHOD: post
      EMQX_AUTH__HTTP__SUPER_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__SUPER_REQ__PARAMS: client_id=%c,username=%u
      EMQX_AUTH__HTTP__ACL_REQ__URL: http://127.0.0.1:3000/emqx/acl
      EMQX_AUTH__HTTP__ACL_REQ__METHOD: get
      EMQX_AUTH__HTTP__ACL_REQ__CONTENT_TYPE: json
      EMQX_AUTH__HTTP__ACL_REQ__PARAMS: access=%A,username=%u,client_id=%c,ip_address=%a,topic=%t,mount_point=%m,protocol=%r

```

根据上述配置，自建的 `HTTP` 服务器需要实现**三个接口**，分别为： `/emqx/auth` 、 `/emqx/superuser` 和 `/emqx/acl`

> [!warning|label:注意]
> 容器启动后默认是没有开启 `emqx_auth_http` 插件的，需要手动去开启。


## 自建HTTP服务实现

在`MQTT`客户端连接的时候，`EMQ X`会首先调用`/emqx/auth`接口，根据这个接口的信息判断用户是否可以连接，如果可以连接，继续判断是否为**超级用户**，如果为超级用户，后面客户端的发布订阅就不需要`ACL`了，自动拥有权限了，否则等到客户端发布或者订阅某条消息的时候会继续走`ACL`接口判断客户端是否拥有权限。

```flow
st=>start: 客户端发起连接请求
auth=>condition: /emqx/auth
superuser=>condition: /emqx/superuser
acl=>condition: /emqx/acl
emqx=>operation: EMQ X
pubsub=>operation: 客户端发布订阅
disableConnect=>operation: 不允许连接
superuserOperation=>operation: 是超级用户，不需要ACl了
disableACL=>operation: 不允许发布订阅
allowACL=>operation: 允许发布订阅
e=>end: 结束

st->emqx->auth
auth(no)->disableConnect
auth(yes)->superuser
superuser(yes,right)->superuserOperation
superuser(no)->pubsub->acl
acl(no)->disableACL
acl(yes)->allowACL->e
```

实现代码：(基于 `nestjs` )

```typescript
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { Controller, Post, Body, HttpException, HttpStatus, Res, Query, Get } from "@nestjs/common";
import { Response } from 'express';
import { DeviceAuthEmqxReqDto } from "../../dtos/device/emqx/device-auth.emqx.req.dto";
import { CheckSuperuserEmqxReqDto } from "../../dtos/device/emqx/check-superuser.emqx.req.dto";
import { CheckACLEmqxReqDto } from "../../dtos/device/emqx/check-acl.emqx.req.dto";

@ApiTags('device Emqx')
@Controller('emqx/devices')
export class DeviceEmqxController {

  @ApiOperation({ summary: 'emqx 连接验证' })
  @Post('auth')
  async create(@Body() body: DeviceAuthEmqxReqDto, @Res() res: Response) {
    // TODO: 实现验证逻辑
    return res.status(HttpStatus.OK).send('success');
  }

  @ApiOperation({ summary: 'emqx校验是否为超级用户' })
  @Post('superuser')
  async superuser(@Body() body: CheckSuperuserEmqxReqDto, @Res() res: Response) {
    // TODO: 实现验证逻辑
    return res.status(status).send('success');
  }

  @ApiOperation({ summary: 'emqx获取用户ACL权限' })
  @Get('acl')
  async getACL(@Query() query: CheckACLEmqxReqDto, @Res() res: Response) {
    // TODO: 实现验证逻辑
    return res.status(status).send('success');
  }
}
```
