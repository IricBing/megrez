# pkg 打包

参考前置笔记：[pkg](../../../实践积累/打包/pkg/README.md)

使用 `pkg` 打包主要要注意程序中指定文件路径的问题，例如常见的 `typeorm` 配置就用到了指定文件路径的方式，看一个常见的配置：

```ts
TypeOrmModule.forRootAsync({
  useFactory: (databaseConfig: ConfigType<typeof DatabaseConfigRegister>) => ({
    type: databaseConfig.type as 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/**/*/entities/subscribers/*.subscriber{.ts,.js}'],
    synchronize: databaseConfig.synchronize,
    logging: databaseConfig.logging
  }),
  inject: [DatabaseConfigRegister.KEY]
}),
```

这里可以明显看到 `entities` 和 `subscribers` 是通过指定路径的方式来查找对应文件的，不做修改就会导致打包后找不到配置。
