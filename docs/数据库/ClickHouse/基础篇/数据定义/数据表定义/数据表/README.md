# 数据表

`ClickHouse` 数据表的定义语法，是在标准 `SQL` 的基础之上建立的。 `ClickHouse` 目前提供了三种最基本的建表方法，如下所示：

## 常规定义方法

常规定义方法的完整语法如下所示：

```sql
$ CREATE TABLE [IF NOT EXISTS] [db_name.]table_name (name1 [type] [DEFAULT|MATERIALIZED|ALIAS expr], name1 [type] [DEFAULT|MATERIALIZED|ALIAS expr], ...) ENGIN = engine
```

使用 `[db_name.]` 参数可以为数据表指定数据库，如果不指定此参数，则会**默认**使用 `default` 数据库。例如执行下面的语句：

```sql
$ CREATE TABLE hits_v1 (
  Title String,
  URL String,
  EventTime DateTime
) ENGINE = Memory
```

> [!tip|label: 提示]
> 注意末尾的 `ENGINE` 参数，它被用于指定数据表的引擎。

上述语句将会在 `default` 默认的数据库下创建一种内存表。表引擎决定了数据表的特性，也决定了数据将会被如何存储及加载。例如，示例中使用的 `Memory` 表引擎，是 `ClickHouse` 最简单的表引擎，数据只会被保存在内存中，在服务重启时数据会丢失。

## 复制定义方法

第二种定义方法是复制其他表的结构，具体语法如下所示：

```sql
$ CREATE TABLE [IF NOT EXISTS] [db_name1.]table_name1 AS [db_name2.]table_name2 [ENGINE = engine]
```

这种方式支持在不同的数据库之间复制表结构，例如下面的语句：

```sql
-- 创建新的数据库
$ CREATE DATABASE IF NOT EXISTS new_db

-- 将default.hits_v1的结构复制到new_db.hits_v1
$ CREATE TABLE IF NOT EXISTS new_db.hits_v1 AS default.hits_v1 ENGINE = TinyLog
```

上述语句将会把 `default.hits_v1` 的表结构原样复制到 `new_db.hits_v1` ，并且 `ENGINE` 表引擎可以与原表不同。

## SELECT 子句定义方法

第三种定义方法是通过 `SELECT` 子句的形式创建，它的完整语法如下：

```sql
$ CREATE TABLE [IF NOT EXISTS] [db_name.]table_name ENGINE = engine AS SELECT ...
```

在这种方式下，不仅会根据 `SELECT` 子句建立相应的表结构，同时还会将 `SELECT` 子句查询的数据顺序写入，例如执行下面的语句：

```sql
$ CREATE TABLE IF NOT EXISTS hits_v1_1 ENGINE = Memory AS SELECT * FROM hits_v1
```

上述语句会将 `SELECT * FROM hits_v1` 的查询结果一并写入数据表。

## 其他操作

`ClickHouse` 和大多数数据库一样，使用 `DESC` 查询可以返回数据表的定义结构。如果想删除一张数据表，则可以使用下面的 `DROP` 语句：

```sql
$ DROP TABLE [IF EXISTS] [db_name.]table_name
```
