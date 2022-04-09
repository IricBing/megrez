# 默认值表达式

## 默认值定义

表字段支持**三种**默认值表达式的定义方法，分别是 `DEFAULT` 、 `MATERIALIZED` 和 `ALIAS` 。无论使用那种形式，表字段一旦被定义了默认值，它便不再强制要求定义数据类型，因为 `ClickHouse` 会根据默认值进行**类型推断**。如果同时对表字段定义了数据类型和默认值表达式，则**以明确定义的数据类型为主**，例如下面的例子：

```sql
$ CREATE TABLE dfv_v1 (
  id String,
  c1 DEFAULT 1000,
  c2 String DEFAULT c1
) ENGINE = TinyLog
```

`c1` 字段没有定义数据类型，默认值为整型 `1000` ； `c2` 字段定义了数据类型和默认值，且默认值等于 `c1` ，现在写入测试数据:

```sql
$ INSERT INTO dfv_v1(id) VALUES ('A000')
```

写入之后执行以下查询：

```sql
$ SELECT c1, c2, toTypeName(c1), toTypeName(c2) FROM dfv_v1;
┌───c1─┬─c2───┬─toTypeName(c1)─┬─toTypeName(c2)─┐
│ 1000 │ 1000 │ UInt16         │ String         │
└──────┴──────┴────────────────┴────────────────┘
```

由查询结果可以验证，默认值的优先级符合我们的预期，其中 `c1` 字段根据默认值被推断为 `UInt16` ；而 `c2` 字段由于同时定义了数据类型和默认值，所以它最终的数据类型来自明确定义的 `String` 。

默认值表达式的三种定义方法之间也存在着不同之处，可以从如下三个方面进行比较。

### 数据写入

在数据写入时，只有 `DEFAULT` 类型的字段可以出现在 `INSERT` 语句中。而 `MATERIALIZED` 和 `ALIAS` 都不能被显式赋值，他们只能依靠计算取值。例如试图为 `MATERIALIZED` 类型的字段写入数据，将会得到如下错误：

```sql
DB:Exception: Cannot insert column URL, because it is MATERIALIZED column..
```

### 数据查询

在数据查询时，只有 `DEFAULT` 类型的字段可以通过 `SELECT *` 返回。而 `MATERIALIZED` 和 `ALIAS` 类型的字段不会出现在 `SELECT *` 查询的返回结果集中。

### 数据存储

在数据存储时，只有 `DEFAULT` 和 `MATERIALIZED` 类型的字段才支持持久化。如果使用的表引擎支持物理存储（例如 `TinyLog` 表引擎），那么这些列字段将会拥有物理存储。而 `ALIAS` 类型的字段不支持持久化，它的取值总是需要依靠计算产生，数据不会落到磁盘。

## 修改默认值

可以使用 `ALTER` 语句修改默认值，例如：

```sql
$ ALTER TABLE [db_name.]table MODIFY COLUMN col_name DEFAULT value;
```

修改动作不会影响数据表内先前已经存在的数据。但是默认值的修改有诸多限制，例如在**合并树**表引擎中，它的**主键**字段是无法被修改的；而某些表引擎则完全不支持修改（例如 `TinyLog` ）。
