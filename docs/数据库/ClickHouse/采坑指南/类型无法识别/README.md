# DB:: Exception: Unknown data type family: DateTime64

## 问题描述

```sql
$ SELECT toDateTime64(now(), 3, 'Asia/Shanghai') AS column, toTypeName(column) AS x

SELECT 
    toDateTime64(now(), 3, 'Asia/Shanghai') AS column, 
    toTypeName(column) AS x

Exception on client:
Code: 50. DB::Exception: Unknown data type family: DateTime64: while receiving packet from localhost:9000, 127.0.0.1

Connecting to database system at localhost:9000.
Connected to ClickHouse server version 22.2.3 revision 54455.
```

## 产生原因

`clickhouse-client` 版本太老，安装最新版即可。
