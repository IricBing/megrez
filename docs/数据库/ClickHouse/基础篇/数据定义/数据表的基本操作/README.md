# 数据表的基本操作

> [!tip|label: 提示]
> 目前只有 `MergeTree` 、 `Merge` 和 `Distributed` 这三类表引擎支持 `ALTER` 查询。

## 追加新字段

假如需要对一张数据表追加新的字段，可以使用如下语法：

```sql
$ ALTER TABLE tb_name ADD COLUMN [IF NOT EXISTS] name [type] [default_expr] [AFTER name_after]
```

例如，在数据表的末尾增加新字段：

```sql
$ ALTER TABLE testcol_v1 ADD COLUMN OS String DEFAULT 'mac';
```

或是通过 `AFTER` 修饰符，在指定字段的后面增加新字段：

```sql
$ ALTER TABLE testcol_v1 ADD COLUMN IP String AFTER ID;
```

对于数据表中已经存在的旧数据而言，新追加的字段会使用默认值补全。

## 修改数据类型

如果需要修改表字段的数据类型或者默认值，需要使用下面的语法：

```sql
$ ALTER TABLE tb_name MODIFY COLUMN [IF EXISTS] name [type] [default_expr]
```

修改某个字段的数据类型，实质上会调用相应的 `toType` 转型方法。如果当前的类型与期望的类型不兼容，则修改操作将会失败。例如，将 `String` 类型的 `IP` 字段修改为 `IPv4` 类型是可行的：

```sql
$ ALTER TABLE testcol_v1 MODIFY COLUMN IP IPv4;
```

而尝试将 `String` 类型转换为 `UInt` 类型就会出现错误：

```sql
$ ALTER TABLE testcol_v1 MODIFY COLUMN OS UInt32;
DB::Exception: Cannot parse string 'mac' as UInt32: syntax error at begin of string.
```

## 修改备注

做好信息备注是保持良好编程习惯的美德之一，追加备注的语法如下所示：

```sql
$ ALTER TABLE tb_name COMMENT COLUMN [IF EXISTS] name 'some comment';
```

例如，为 `ID` 字段增加备注：

```sql
$ ALTER TABLE testcol_v1 COMMENT COLUMN ID '主键ID';
```

使用 `DESC` 查询可以看到上述增加备注的操作已经生效：

```sql
$ DESC testcol_v1;
┌─name─┬─type──┬─default_type─┬─default_expression─┬─comment─┬─codec_expression─┬─ttl_expression─┐
│ ID   │ Int32 │              │                    │ 主键ID  │                  │                │
└──────┴───────┴──────────────┴────────────────────┴─────────┴──────────────────┴────────────────┘
```

## 删除已有字段

假如要删除某个字段，可以使用下面的语句：

```sql
$ ALTER TABLE tb_name DROP COLUMN [IF EXISTS] name
```

例如，执行下面的语句删除 `URL` 字段：

```sql
$ ALTER TABLE testcol_v1 DROP COLUMN URL
```

上述列字段在被删除之后，它的数据也会被连带删除。进一步来到 `testcol_v1` 的数据目录查验，会发现 `URL` 的数据文件已经被删除了：

```bash
# pwd
/chbase/data/data/default/testcol_v1/201907_2_2_0
# ll
total 56
-rw-r-----. 1 clickhouse clickhouse  28 Jul  2 21:02 EventTime.bin
-rw-r-----. 1 clickhouse clickhouse  30 Jul  2 21:02 ID.bin
-rw-r-----. 1 clickhouse clickhouse  30 Jul  2 21:02 IP.bin
-rw-r-----. 1 clickhouse clickhouse  30 Jul  2 21:02 OS.bin
省略…
```

## 移动数据表

在 `Linux` 系统中， `mv` 命令的本意是将一个文件从原始位置 `A` 移动到目标位置 `B` ，但是如果位置 `A` 与位置 `B` 相同，则可以变相实现**重命名**的作用。 `ClickHouse` 的 `RENAME` 查询就与之有异曲同工之妙， `RENAME` 语句的完整语法如下所示：

```sql
$ RENAME TABLE [db_name11.]tb_name11 TO [db_name12.]tb_name12, [db_name21.]tb_name21 TO [db_name22.]tb_name22 ...
```

`RENAME` 可以修改数据表的名称，如果将原始数据库与目标数据库设为不同的名称，那么就可以实现数据表在两个数据库之间移动的效果。例如在下面的例子汇总 `，testcol_v1` 从 `default` 默认数据库被移动到了 `db_test` 数据库，同时数据表被重命名为 `testcol_v2` :

```sql
$ RENAME TABLE default.testcol_v1 TO db_test.testcol_v2
```

> [!warning|label: 注意]
> 数据表的移动只能在**单个节点**的范围内。换言之，数据表移动的目标数据库和原始数据库必须处在同一个服务节点内，而不能是集群中的远程节点。

## 清空数据表

假设需要将表内的数据全部清空，而不是直接删除这张表，则可以使用 `TRUNCATE` 语句，它的完整语法如下所示：

```sql
$ TRUNCATE TABLE [IF EXISTS] [db_name.]tb_name
```

例如执行下面的语句，就能将 `db_test.testcol_v2` 的数据一次性清空：

```sql
$ TRUNCATE TABLE db_test.testcol_v2
```
