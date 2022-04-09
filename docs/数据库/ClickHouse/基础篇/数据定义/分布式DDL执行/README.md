# 分布式 DDL 执行

`ClickHouse` 支持集群模式，一个集群拥有 `1` 到多个节点。 `CREATE` 、 `ALTER` 、 `DROP` 、 `RENAME` 及 `TRUNCATE` 这些 `DDL` 语句，都支持**分布式执行**。这意味着，如果在集群中任意一个节点上执行 `DDL` 语句，那么集群中的每个节点都会以相同的顺序执行相同的语句。这项特性意义非凡，它就如同批处理命令一样，省去了需要依次去单个节点执行 `DDL` 的烦恼。

将一条普通的 `DDL` 语句转换成分布式执行十分简单，只需要加上 `ON CLUSTER cluster_name` 声明即可。例如，执行下面的语句后将会对 `ch_cluster` 集群内的所有节点广播这条 `DDL` 语句：

```sql
$ CREATE TABLE partition_v3 ON CLUSTER ch_cluster (
  ID String,
  URL String,
  EventTime Date
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(EventTime)
ORDER BY ID
```

> [!warning|label: 注意]
> 这条语句在单机版环境下是不会执行成功的，需要存在一个名为 `ch_cluster` 的集群才行。
