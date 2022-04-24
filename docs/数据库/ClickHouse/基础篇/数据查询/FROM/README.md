# FROM 子句

`FROM` 子句表示**从何处读取数据**，目前支持如下 `3` 种形式：

1. 从**数据表**中取数：

```sql
$ SELECT WatchID FROM hits_v1;
```

2. 从**子查询**中取数：

```sql
$ SELECT MAX_WatchID
FROM (SELECT MAX(WatchID) AS MAX_WatchID FROM hits_v1);
```

3. 从**函数**中取数：

```sql
$ SELECT number FROM number(5)
```

`FROM` 关键字可以省略，此时会从**虚拟表**中取数。在 `ClickHous` e中，并没有数据库中常见的 `DUAL` 虚拟表，取而代之的是 `system.one` 。例如下面的两条查询语句，其效果是等价的：

```sql
$ SELECT 1;
$ SELECT 1 FROM system.one;
┌─1─┐
│ 1 │
└───┘
```

在 `FROM` 子句后，可以使用 `Final` 修饰符。它可以配合 `CollapsingMergeTree` 和 `VersionedCollapsingMergeTree` 等表引擎进行查询操作，以强制在查询过程中合并，但由于 `Final` 修饰符会降低查询性能，所以应该尽可能避免使用它。
