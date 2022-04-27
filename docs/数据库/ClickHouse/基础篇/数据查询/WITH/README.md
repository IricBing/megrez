# WITH 子句

`ClickHouse` 支持 `CTE` （ `Common Table Expression` ，**公共表表达式**），以增强查询语句的表达。例如下面的函数嵌套：

```sql
$ SELECT pow(pow(2, 2), 3)
```

在改用 `CTE` 的形式后，可以极大地提高语句的可读性和可维护性，简化后的语句如下所示：

```sql
$ WITH pow(2, 2) AS a SELECT pow(a, 3)
```

`CTE` 通过 `WITH` 子句表示，目前支持以下四种用法：

## 定义变量

可以定义变量，这些变量能够在后续的查询子句中被直接访问。例如下面示例中的常量 `start` ，被直接用在紧接的 `WHERE` 子句中：

```sql
$ WITH 10 AS start 
SELECT number FROM system.numbers 
WHERE number > start 
LIMIT 5;
┌─number─┐
│     11 │
│     12 │
│     13 │
│     14 │
│     15 │
└────────┘
```

## 调用函数

可以访问 `SELECT` 子句中的列字段，并调用函数做进一步的加工处理。例如在下面的示例中，对 `data_uncompressed_bytes` 使用聚合函数求和后，又紧接着在 `SELECT` 子句中对其进行了格式化处理：

```sql
$ WITH SUM(data_uncompressed_bytes) AS bytes 
SELECT database, formatReadableSize(bytes) AS format FROM system.columns 
GROUP BY database 
ORDER BY bytes DESC;
┌─database───────────┬─format────┐
│ system             │ 21.75 GiB │
│ dawen              │ 4.91 GiB  │
│ default            │ 0.00 B    │
│ INFORMATION_SCHEMA │ 0.00 B    │
│ information_schema │ 0.00 B    │
└────────────────────┴───────────┘
```

## 定义子查询

可以定义子查询。例如在下面的示例中，借助子查询可以得出各 `database` 未压缩数据大小与数据总和大小的比例的排名：

```sql
$ WITH (SELECT SUM(data_uncompressed_bytes) FROM system.columns) AS total_bytes
SELECT database, (SUM(data_uncompressed_bytes) / total_bytes) * 100 AS database_disk_usage
FROM system.columns
GROUP BY database
ORDER BY database_disk_usage DESC;
┌─database───────────┬─database_disk_usage─┐
│ system             │   81.58541185162147 │
│ dawen              │   18.41458814837853 │
│ default            │                   0 │
│ INFORMATION_SCHEMA │                   0 │
│ information_schema │                   0 │
└────────────────────┴─────────────────────┘
```

在 `WITH` 中使用子查询时有一点需要特别注意：**该查询语句只能返回一行数据，如果结果集的数据大于一行则会抛出异常**。

## 在子查询中重复使用WITH

在子查询中可以嵌套使用 `WITH` 子句，例如在下面的示例中，在计算出各 `database` 未压缩数据大小与数据中和的比例后，又进行了取整函数的调用：

```sql
$ WITH (round(database_disk_usage)) AS database_disk_usage_v1
SELECT database, database_disk_usage, database_disk_usage_v1
FROM (
  WITH (SELECT SUM(data_uncompressed_bytes) FROM system.columns) AS total_bytes
  SELECT database, (SUM(data_uncompressed_bytes) / total_bytes) * 100 AS database_disk_usage FROM system.columns
  GROUP BY database
  ORDER BY database_disk_usage DESC
);
┌─database───────────┬─database_disk_usage─┬─database_disk_usage_v1─┐
│ system             │   81.58541185162147 │                     82 │
│ dawen              │   18.41458814837853 │                     18 │
│ default            │                   0 │                      0 │
│ INFORMATION_SCHEMA │                   0 │                      0 │
│ information_schema │                   0 │                      0 │
└────────────────────┴─────────────────────┴────────────────────────┘
```
