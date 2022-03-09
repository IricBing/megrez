# 连接数据库

连接数据库语法：

```bash
$ clickhouse-client --host localhost --user default --password 密码 --port 9000
```

连接参数说明：

|指令|简写|含义|
|-----|-----|-----|
| `--host` | `-h` |服务端的 `host` 名称, **默认**是 `localhost` 。可以选择使用 `host` 名称或者 `IPv4` 或 `IPv6` 地址。|
| `--port` | 无| 连接的**端口**，默认值： `9000` 。注意 `HTTP` 接口以及 `TCP` 原生接口使用的是不同端口。|
| `--user` | `-u` | 用户名。 默认值： `default` 。|
| `--password` |无 | 密码。 默认值：**空字符串**。|
