# TOO_MANY_SIMULTANEOUS_QUERIES

[stackoverflow](https://stackoverflow.com/questions/43033077/too-many-simultaneous-queries-in-clickhouse)

## 产生场景

同时查询过于频繁。

## 解决方案

修改 `/etc/clickhouse-server/config.xml` 文件，找到 `max_concurrent_queries` 字段，默认为 `100` ，修改成想要的值。

```xml
<max_concurrent_queries>1000</max_concurrent_queries>
```

重启服务即可。
