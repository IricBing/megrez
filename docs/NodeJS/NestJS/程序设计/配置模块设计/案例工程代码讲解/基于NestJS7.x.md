# 配置模块案例工程代码讲解——基于 `NestJS 7.x`

## 案例工程地址

* [GitHub](https://github.com/IricBing/nestjs-config)

## 项目结构

```shell
$ tree -a   # 已删除 .git 文件夹
nestjs-config
    ├── docker-compose.yml
    ├── Dockerfile
    ├── .dockerignore
    ├── .env.development
    ├── .eslintrc.js
    ├── .gitignore
    ├── nest-cli.json
    ├── .nvmrc
    ├── package.json
    ├── .prettierrc
    ├── README.md
    ├── src
    │   ├── app.module.ts
    │   ├── main.ts
    │   └── modules
    │       └── config
    │           ├── config.module.ts
    │           ├── constants
    │           │   └── config.constant.ts
    │           ├── registers
    │           │   ├── common.register.ts
    │           │   ├── database.register.ts
    │           │   └── redis.register.ts
    │           ├── services
    │           │   └── config.service.ts
    │           └── validations
    │               └── config.validation.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    ├── tsconfig.build.prod.json
    ├── tsconfig.json
    ├── .vscode
    │   ├── launch.json
    │   └── settings.json
    ├── yarn.lock
    └── .yarnrc

9 directories, 29 files
```

按照文档，先生成本地配置文件

```shell
$ cp .env.development .env
```

主要讲解 `src` 文件夹下的文件，其他文件参考[nestjs工程配置](../../工程配置/README.md)

```shell
$ tree -a 
src
├── app.module.ts   # 主模块
├── main.ts     # 项目入口文件
└── modules 
    └── config
        ├── config.module.ts    # 自定义Config模块声明文件
        ├── constants       
        │   └── config.constant.ts  # config 模块常量文件
        ├── registers
        │   ├── common.register.ts  # 公共配置注册文件
        │   ├── database.register.ts    # 数据库（Postgresql）配置注册文件
        │   └── redis.register.ts   # Redis配置注册文件
        ├── services
        │   └── config.service.ts   # 自定义配置服务
        └── validations
            └── config.validation.ts    # 配置校验

6 directories, 9 files
```

## 功能实现

### 配置校验功能

项目一般都会依赖一些必要的配置才能正常运行，比如项目需要连接数据库，然而配置文件中没有数据库的连接地址，那么项目就不应该启动，而是在启动前直接报错，退出。

承接上一篇笔记，采用 `joi` 这个库进行配置校验，代码实现在 `src/modules/config/validations/config.validation.ts` 这个文件中，内容如下：
<details>
<summary>展开查看源码</summary>

```typescript
import * as Joi from 'joi';

/** .env文件校验 */
export const ConfigValidation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),

  // Common
  COMMON_JWT_EXPIRES_IN: Joi.number().default(720000),
  COMMON_PRINT_USER_ACTIVITY_LOG: Joi.boolean().default(true),
  COMMON_PRINT_SYSTEM_LOG: Joi.boolean().default(true),
  COMMON_ENABLE_SWAGGER: Joi.boolean().default(true),
  COMMON_PASSWORD_SALT: Joi.string().required(),
  COMMON_PORT: Joi.number().default(3000),

  // Postgresql数据库配置
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_LOGGING: Joi.boolean().default(false),

  // Redis Token数据库配置
  REDIS_TOKEN_NAME: Joi.string().required(),
  REDIS_TOKEN_DB: Joi.number().default(1),
  REDIS_TOKEN_HOST: Joi.string().required(),
  REDIS_TOKEN_PORT: Joi.number().default(6379),
  REDIS_TOKEN_PASSWORD: Joi.string().allow('').default(''),
  REDIS_TOKEN_KEY_PREFIX: Joi.string().required(),

  // Redis 分布式锁数据库配置
  REDIS_LOCK_NAME: Joi.string().required(),
  REDIS_LOCK_DB: Joi.number().default(2),
  REDIS_LOCK_HOST: Joi.string().required(),
  REDIS_LOCK_PORT: Joi.number().default(6379),
  REDIS_LOCK_PASSWORD: Joi.string().allow('').default(''),
  REDIS_LOCK_KEY_PREFIX: Joi.string().required()
});
```

</details>

关于 `Joi` 这个库的具体用法可[查看](https://joi.dev/api/)。虽然校验写完了，但是如何将这个校验逻辑放到代码中让其执行仍需其他配置，在下面会介绍配置的地方。

## 与NestJS提供的包 @nestjs/config 整合

`NestJS` 本身提供了 `config` 功能，[官方文档](https://docs.nestjs.com/techniques/configuration)，这篇文档写的算是官方文档中比较全的了，不得不吐槽官方文档的简陋，做了很多功能，却不写出来。。。

通过官方文档，会发现 `@nestjs/config` 这个包提供一个 `ConfigService` 的可注入类，并且会将配置文件中的内容注册成属性（当然，需要写 `register` 配置文件，可阅读 `src/modules/config/registers` 目录下的文件来查看实现细节，在此不做展开）。我们在此基础上进行魔改，魔改的原因是因为我们通过其默认的 `ConfigService` 拿到的字段**类型未知**，导致**类型推断不友好**，需要指定**泛型**才行，同时还需要输入字符串来获取。默认方式如下所示：

```typescript
this.configService.get<number>('common.jwtExpiresIn');
```

所以我在官方的基础上有封装了一层，文件为： `src/modules/config/services/config.service.ts` ，内容如下
<details>
<summary>展开查看源码</summary>

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleOptions } from 'nestjs-redis';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  /** 公共配置 */
  get common() {
    return {
      /** jwt token有效期，单位：毫秒 */
      jwtExpiresIn: this.nestConfigService.get<number>('common.jwtExpiresIn'),
      /** 是否打印用户活动日志 */
      printUserActivityLog: this.nestConfigService.get<number>('common.printUserActivityLog'),
      /** 是否打印系统日志 */
      printSystemLog: this.nestConfigService.get<number>('common.printSystemLog'),
      /** 密码盐 */
      passwordSalt: this.nestConfigService.get<number>('common.passwordSalt'),
      /** 是否启用Swagger */
      enableSwagger: this.nestConfigService.get<boolean>('common.enableSwagger'),
      /** 程序占用端口号 */
      port: this.nestConfigService.get<number>('common.port')
    };
  }

  /** postgresql数据库配置 */
  get database(): TypeOrmModuleOptions {
    return {
      /** 数据库类型 */
      type: this.nestConfigService.get<'postgres'>('database.type'),
      /** 数据库连接Host */
      host: this.nestConfigService.get<string>('database.host'),
      /** 数据库连接端口 */
      port: this.nestConfigService.get<number>('database.port'),
      /** 数据库连接用户名 */
      username: this.nestConfigService.get<string>('database.username'),
      /** 数据库连接密码 */
      password: this.nestConfigService.get<string>('database.password'),
      /** 要连接的数据库名称 */
      database: this.nestConfigService.get<string>('database.database'),
      /** 代码实体目录 */
      entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
      /** 是否同步数据库 */
      synchronize: this.nestConfigService.get<boolean>('database.synchronize'),
      /** 是否打印orm */
      logging: this.nestConfigService.get<boolean>('database.logging')
    };
  }

  /** redis数据库配置 */
  get redis() {
    return {
      /** token存储数据库配置 */
      token: this.redisTokenConfig(),
      /** 分布式锁数据库配置 */
      lock: this.redisLockConfig()
    };
  }

  private redisTokenConfig(): RedisModuleOptions {
    return {
      /** 自定义服务名称 */
      name: this.nestConfigService.get<string>('redis.token.name'),
      /** 数据库Host */
      host: this.nestConfigService.get<string>('redis.token.host'),
      /** 数据库端口 */
      port: this.nestConfigService.get<number>('redis.token.port'),
      /** 数据库编号0-15 */
      db: this.nestConfigService.get<number>('redis.token.db'),
      /** 登录密码 */
      password: this.nestConfigService.get<string>('redis.token.password'),
      /** Key前缀 */
      keyPrefix: this.nestConfigService.get<string>('redis.token.keyPrefix')
    };
  }

  private redisLockConfig(): RedisModuleOptions {
    return {
      /** 自定义服务名称 */
      name: this.nestConfigService.get<string>('redis.lock.name'),
      /** 数据库Host */
      host: this.nestConfigService.get<string>('redis.lock.host'),
      /** 数据库端口 */
      port: this.nestConfigService.get<number>('redis.lock.port'),
      /** 数据库编号0-15 */
      db: this.nestConfigService.get<number>('redis.lock.db'),
      /** 登录密码 */
      password: this.nestConfigService.get<string>('redis.lock.password'),
      /** Key前缀 */
      keyPrefix: this.nestConfigService.get<string>('redis.lock.keyPrefix')
    };
  }
}
```

</details>

这样我们在调用的时候就可以通过如下方式了：

```typescript
const port = this.configService.common.port;    
```

以上写法可以自动推断出 `port` 的类型为 `number` ，并且不用手写字符串输入，**注意：**这里的 `configService` 是我们封装的，不是 `@nestjs/config` 这个包提供的 `ConfigService` 。

## 配置整合

虽然大体思路已经写完了，但是如何将这些文件组装，以及应用仍需一定的修改。先看一下 `src/modules/config/config.module.ts` 这个文件，内容如下：

```typescript
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigValidation } from './validations/config.validation';
import { CommonConfigRegister } from './registers/common.register';
import { DatabaseConfigRegister } from './registers/database.register';
import { RedisConfigRegister } from './registers/redis.register';
import { ConfigProvider } from './constants/config.constant';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: ConfigValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      },
      load: [CommonConfigRegister, DatabaseConfigRegister, RedisConfigRegister]
    })
  ],
  providers: [
    {
      provide: ConfigProvider,
      useClass: ConfigService
    }
  ],
  exports: [ConfigProvider]
})
export class ConfigModule {}
```

这里面因为名称冲突的原因，将 `@nestjs/config` 中的 `ConfigModule` 类重命名为 `NestConfigModule` ，其中 `forRoot()` 方法里面参数属性 `validationSchema` 是用来校验配置的逻辑，参数属性 `load` 是用来注册到 `@nestjs/config` 中的 `ConfigModule` 类属性的声明。

接下来看一下如何动态配置其他模块，这里拿 `typeorm` 和 `nestjs-redis` 来举例。查看 `src/app.module.ts` 文件，内容如下：

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from './modules/config/config.module';
import { ConfigProvider } from './modules/config/constants/config.constant';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.database,
      inject: [ConfigProvider]
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => [configService.redis.token, configService.redis.lock],
      inject: [ConfigProvider]
    }),
    ConfigModule
  ]
})
export class AppModule {}
```

大功告成。
