# 鉴权

## 需求背景

`Emqx` 默认是不需要鉴权的，只要知道了服务的地址和端口就可以连接上来，并任意的发布订阅。这种情况在生产环境中是及其危险的！

官方也提供了一系列的鉴权方式，内置存储，外置服务，外数据库等方式，详见：[Emqx认证](https://docs.emqx.net/broker/latest/cn/advanced/auth.html)

## 选取方案

### 方案评估

* Username认证

官方即将废弃，忽略

* Client ID 认证

官方即将废弃，忽略

* Mnesia 认证

认证信息的维护在其内部进行，我们只能通过http方法主动给他推送，不好维护，灵活度过低

* HTTP 认证

当有设备发起连接请求时，Emqx会往配置的http服务（也就是我们的master）发送http请求，根据返回的状态码和body数据有无来判断是否允许连接，是否允许订阅，此方式便于我们维护，灵活度高

* JWT 认证

此方式有安全隐患，官网提示：JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限，使用 JWT 时建议启用 TLS 加密传输。 JWT 使用过程中无法在过期前废止某个 Token，请妥善设置有效时长并保管好密钥等加密信息。

* LDAP 认证

需自行搭建LDAP服务器，技术栈之外，成本过大，忽略

* MySQL 认证

使用外部MySQL数据库来存储认证信息，我们服务需要单独维护MySQL数据库中的表和数据，成本太大

* PostgreSQL 认证

同MySQL认证

* Redis 认证

同MySQL认证

* MongoDB 认证

同MySQL认证

基于多方面考虑，我们选择其中灵活度最高的**http验证**。详见：[官方文档](https://www.emqx.io/cn/blog/emqx-mqtt-broker-http-authentication-plugin-tutorial)

这对我们来说工作量是最小的，只需要在 `master` 服务上增加一个入口给 `emqx` 来用即可。

## 开启ACL配置

默认 `ACL` 校验找不到的时候是允许客户端成功发布和订阅的，需要更改 `etc/emqx.conf` 配置文件，将该选项更改为：

```

## Allow anonymous authentication by default if no auth plugins loaded.

## Notice: Disable the option in production deployment!

##

## Value: true | false

allow_anonymous = false  ## 默认为false

## Allow or deny if no ACL rules matched.

##

## Value: allow | deny

acl_nomatch = deny ## 默认为allow
```

## 配置http认证

编辑文件 `etc/plugins/emqx_auth_http.conf`

详见：[emqx_auth_http.conf](https://megrez-file.virtualbing.fun/%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6/Emqx/%E5%9F%BA%E7%A1%80%E7%AF%87/%E9%89%B4%E6%9D%83/emqx_auth_http.conf)

## 启用认证插件

[插件启用官方文档](https://docs.emqx.net/broker/latest/cn/advanced/plugins.html#%E5%90%AF%E5%81%9C%E6%8F%92%E4%BB%B6)

在服务器配置的时候，最好使用**默认加载**或者**命令行**方式来管理

### 默认加载方式

编辑 `data/loaded_plugins` 文件，在结尾追加

```

{emqx_auth_http,true}.
```

完整示例：

```

emqx_management.
emqx_recon.
emqx_retainer.
emqx_dashboard.
emqx_rule_engine.
{emqx_auth_http,true}.
```

### 使用命令行方式

[使用方式](https://docs.emqx.net/broker/latest/cn/advanced/cli.html#load_plugin)

```bash
$ ./bin/emqx_ctl plugins list # 查看所有可用插件列表
$ ./bin/emqx_ctl plugins load emqx_auth_http  # 启用emqx_auth_http插件
$ ./bin/emqx_ctl plugins unload emqx_auth_http  # 禁用emqx_auth_http插件
$ ./bin/emqx_ctl plugins reload emqx_auth_http  # 重载emqx_auth_http插件
```

## 采坑集锦

### 服务返回信息

返回信息只有两个是有用的，一个是 `返回状态码` , 一个是 `body内容有无` 。

> [!warning|label:注意]
> 是 `body` 内容有无，而不是 `body` 中的内容， `body` 返回 `json` ，返回字符串， `Boolean` 都是一样的， `emqx` 不会看返回的内容， `只会看你有没有返回body！`


### 超级用户不走ACL

如果客户端在连接的时候赋予了用户超级用户的权限，那么它进行任何的发布订阅操作均不会收到ACL请求！！！

## 附录

### 附录A controller代码示例：

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

### 附录B 关键配置文件

[emqx.conf](https://megrez-file.virtualbing.fun/%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6/Emqx/%E5%9F%BA%E7%A1%80%E7%AF%87/%E9%89%B4%E6%9D%83/emqx.conf) 

[emqx_auth_http.conf](https://megrez-file.virtualbing.fun/%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6/Emqx/%E5%9F%BA%E7%A1%80%E7%AF%87/%E9%89%B4%E6%9D%83/emqx_auth_http.conf)
