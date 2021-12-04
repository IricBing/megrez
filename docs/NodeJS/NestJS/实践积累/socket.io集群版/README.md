# socket.io 集群版

[中文文档](https://docs.nestjs.cn/8/websockets?id=%e6%8b%93%e5%b1%95-socketio)

[官方文档](https://docs.nestjs.com/websockets/adapter)

> [!warning|label:注意]
> 截止到目前（2021年11月17日），中文文档和官方文档中都使用了[socket.io-redis](https://www.npmjs.com/package/socket.io-redis)这个包，但是这个包已经在 `6` 个月前就声明 `deprecated` 了，迁移至新的[@socket.io/redis-adapter](https://www.npmjs.com/package/@socket.io/redis-adapter)地址了。


## 实现原理与方式

写不过来了，有空补。

## 安装必要包

```bash
$ pnpm add @nestjs/websockets @nestjs/platform-socket.io socket.io @socket.io/redis-adapter redis
$ pnpm add -D @types/redis
```

## 编写适配器

建立适配器文件 `redis-io.adapter.ts` ，写入如下内容：

```ts
import { ConfigType } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient, RedisClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { RedisConfigRegister } from '../../config/registers/redis.register';

/** socket.io redis 适配器 */
export class RedisIoAdapter extends IoAdapter {
  constructor(app: NestExpressApplication, redisConfig: ConfigType<typeof RedisConfigRegister>) {
    super(app);
    this.pubClient = createClient({ host: redisConfig.common.host, port: redisConfig.common.port });
    this.subClient = this.pubClient.duplicate();
  }

  private pubClient: RedisClient;
  private subClient: RedisClient;

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(createAdapter(this.pubClient, this.subClient));
    return server;
  }
}
```

> [!tip|label:提示]
> 主要参考 `socket.io` 的官方文档中[redis适配器](https://socket.io/docs/v4/redis-adapter/)部分。


## 使用

在 `main.ts` 文件中配置，具体参考如下：

```ts {3, 6}
……
const app = await NestFactory.create<NestExpressApplication>(AppModule); 
const redisConfig = app.select(AppModule).get<ConfigType<typeof RedisConfigRegister>>(RedisConfigRegister. KEY); 

// 使用Redis socket.io适配器
app.useWebSocketAdapter(new RedisIoAdapter(app, redisConfig)); 
……
```
