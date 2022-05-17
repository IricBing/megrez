# socket.io 集群版

## 实现原理

官方已经给出了解决方案，就是 `Websockets` 的 `Adapters` ，参加[官方文档](https://docs.nestjs.com/websockets/adapter)

> [!warning|label: 注意]
> 前端也要针对性的修改，要配置 `transports: ['websocket']` 或者后台在负载层面支持 `cookie` 。

## 安装依赖

```bash
$ pnpm add redis socket.io @socket.io/redis-adapter @nestjs/platform-socket.io @nestjs/websockets
```

## 编写适配器

建立适配器文件 `redis-io.adapter.ts` ，写入如下内容：

```ts
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigType } from '@nestjs/config';
import { createAdapter } from '@socket.io/redis-adapter';
import { ServerOptions } from 'socket.io';
import { createClient } from 'redis';
import { RedisConfigRegister } from '../../config/registers/redis.register';

/** socket.io redis 适配器 */
export class RedisIoAdapter extends IoAdapter {
  constructor(private readonly app: NestExpressApplication, private readonly redisConfig: ConfigType<typeof RedisConfigRegister>) {
    super(app);
  }

  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: `redis://${this.redisConfig.common.host}:${this.redisConfig.common.port}` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
```

## 使用

在 `main.ts` 文件中配置，具体参考如下：

```ts
const app = await NestFactory.create(AppModule);

// socket.io redis 适配器
const redisIoAdapter = new RedisIoAdapter(app, redisConfig);
await redisIoAdapter.connectToRedis();

app.useWebSocketAdapter(redisIoAdapter);
```
