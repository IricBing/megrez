# 临时表

`ClickHouse` 也有**临时表**的概念，创建临时表的方法是在普通表的基础之上添加 `TEMPORARY` 关键字，它的完整语法如下所示：

```sql
$ CREATE TEMPORARY TABLE [IF NOT EXISTS] table_name (
  name1 [type] [DEFAULT|MATERIALIZED|ALIAS expr],
  name2 [type] [DEFAULT|MATERIALIZED|ALIAS expr],
)
```

相比普通表而言，临时表有如下两点特殊之处：

1. 它的生命周期是**会话绑定**的，所有它只支持`Memory`表引擎，如果会话结束，数据表就会被销毁。
2. **临时表不属于任何数据库**，所以在它的建表语句中，既没有数据库参数也没有表引擎参数。

既然临时表不属于任何数据库，如果临时表和普通表名称相同，会出现什么状况？接下来不妨做个测试。首先在 `DEFAULT` 数据库串讲测试表并写入数据：

```sql
$ CREATE TABLE tmp_v1 (
  title String
) ENGINE = Memory;

$ INSERT INTO tmp_v1 VALUES ('click')
```

接着创建一张名称相同的临时表并写入数据：

```sql
$ CREATE TEMPORARY TABLE tmp_v1 (createtime Datetime)

$ INSERT INTO tmp_v1 VALUES (now())
```

现在查询tmp_v1看看会发生什么：

```sql
$ SELECT * FROM tmp_v1;
┌──────────createtime─┐
│ 2022-04-09 04:29:05 │
└─────────────────────┘
```

通过返回结果可以得出结论：**临时表的优先级是大于普通表的**。当两张数据表名称相同的时候，会优先读取临时表的数据。

在 `ClickHouse` 的日常使用中，通常不会刻意使用临时表。它更多被运用在 `ClickHouse` 的内部，**是数据在集群间传播的载体**。
