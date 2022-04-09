# 视图

`ClickHouse` 拥有**普通**和**物化**两种视图。

## 普通视图

普通视图只是一层简单的查询代理。创建普通视图的完整语法如下所示：

```sql
$ CREATE VIEW [IF NOT EXISTS] [db_name.]view_name AS SELECT ...
```

普通视图不会存储任何数据，它只是一层单纯的 `SELECT` 查询映射，起着简化查询、明晰语义的作用，对查询性能不会有任何增强。假设有一张普通视图 `view_tb_v1` ，他是基于数据表 `tb_v1` 创建的，那么下面的两条 `SELECT` 查询是完全等价的：

```sql
-- 普通表
$ SELECT * FROM tb_v1;

-- tb_v1的视图
$ SELECT * FROM view_tb_v1;
```

## 物化视图

物化视图拥有独立的**存储**，支持**表引擎**，数据保存形式由它的表引擎决定，创建物化视图的完整语法如下所示：

```sql
$ CREATE [MATERIALIZED] VIEW [IF NOT EXISTS] [db.]table_name [TO[db.]name] [ENGINE = engine] [POPULATE] AS SELECT ...
```

物化视图创建好之后，如果源表被写入新数据，那么物化视图也会同步更新。 `POPULATE` 修饰符决定了物化视图的初始化策略：如果使用了 `POPULATE` 修饰符，那么在创建视图的过程中，会连带将源表中已存在的数据一并导入，如果执行了 `SELECT INTO` 一般；反之，如果不适用 `POPULATE` 修饰符，那么物化视图在创建之后是没有数据的，它只会同步在此之后被写入源表的数据。物化视图目前并不支持同步删除，如果在源表中删除了数据，物化视图的数据仍会保留。

物化视图本质是一张特殊的数据表，例如使用 `SHOW TABLES` 查询数据表的列表：

```sql
$ SHOW TABLES
┌────────────────name─┐
│ .inner.view_test2   │
│ .inner.view_test3   │
└─────────────────────┘
```

可以发现，物化视图也在其中，它们是使用了 `.inner` 特殊前缀的数据表，所以删除视图的方法是直接使用 `DROP TABLE` 查询，例如：

```sql
$ DROP TABLE view_name;
```
