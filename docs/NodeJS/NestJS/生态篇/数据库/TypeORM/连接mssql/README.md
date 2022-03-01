# 连接 SQL Server

连接 `SQL Server` 要注意加密问题，连接示例如下：

```ts
TypeOrmModule.forRoot({
  type: 'mssql',
  host: 'localhost',
  port: 31433,
  username: 'sa',
  password: 'm5tgb6tfc%^',
  database: 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  logging: false,
  options: {
    encrypt: false
  }
})
```

> [!tip|label: 提示]
> 区别于其他的数据库，其中的 `options.encrypt` 字段是独有的，必须设置，否则就会报错： `self signed certificate`
