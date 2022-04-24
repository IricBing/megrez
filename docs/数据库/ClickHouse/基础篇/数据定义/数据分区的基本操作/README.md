# 数据分区的基本操作

了解并善用数据分区益处颇多，熟练掌握它的使用方法，可以为后续的程序设计带来极大的灵活性和便利性，目前只有 `MergeTree` 系列的表引擎支持数据分区。

## 环境准备

建立测试分区表并预置一些数据：

```sql
$ CREATE TABLE partition_v2 (
  ID String,
  URL String,
  EventTime Date
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(EventTime)
ORDER BY ID;

$ INSERT INTO partition_v2 VALUES 
('A000', 'www.baidu.com', '2022-04-01'), 
('A001', 'www.virtualbing.fun', '2022-05-01'), 
('A002', 'www.virtualbing.fun', '2022-05-02'), 
('A003', 'www.virtualbing.fun', '2022-04-02'), 
('A004', 'www.virtualbing.fun', '2022-04-03'), 
('A005', 'www.virtualbing.fun', '2022-06-03'), 
('A006', 'www.virtualbing.fun', '2022-06-04');
```

## 查询分区信息

`ClickHouse` 内置了许多 `system` 系统表，用于查询自身的状态信息。其中 `parts` 系统表专门用于查询数据表的分区信息。例如执行下面的语句，就能够得到数据表 `partition_v2` 的分区状况：

```sql
$ SELECT partition_id, name, table, database FROM system.parts WHERE table = 'partition_v2';
┌─partition_id─┬─name─────────┬─table────────┬─database─┐
│ 202204       │ 202204_1_1_0 │ partition_v2 │ default  │
│ 202205       │ 202205_2_2_0 │ partition_v2 │ default  │
│ 202206       │ 202206_3_3_0 │ partition_v2 │ default  │
└──────────────┴──────────────┴──────────────┴──────────┘
```

如上所示，目前 `partition_v2` 共拥有 `3` 个分区，其中 `partition_id` 或者 `name` 等同于分区的**主键**，可以基于他们的取值确定一个具体的分区。

## 删除指定分区

合理地设计分区键并利用分区的删除功能，就能够达到数据更新的目的。删除一个指定分区的语法如下所示：

```sql
$ ALTER TABLE tb_name DROP PARTITION partition_expr;
```

假如现在需要更新 `partition_v2` 数据表整个 `4` 月份的数据，则可以先将 `4` 月份的分区删除：

```sql
$ ALTER TABLE partition_v2 DROP PARTITION 202204;
```

然后将整个 `4` 月份的新数据重新写入，就可以达到更新的目的：

```sql
$ INSERT INTO partition_v2 VALUES 
('A000-update', 'www.baidu.com', '2022-04-01'), 
('A003-update', 'www.virtualbing.fun', '2022-04-02'), 
('A004-update', 'www.virtualbing.fun', '2022-04-03');
```

查验数据表，可以看到 `4` 月份的数据已然更新：

```sql
$ SELECT * FROM partition_v2 ORDER BY EventTime;
┌─ID──────────┬─URL─────────────────┬──EventTime─┐
│ A000-update │ www.baidu.com       │ 2022-04-01 │
│ A003-update │ www.virtualbing.fun │ 2022-04-02 │
│ A004-update │ www.virtualbing.fun │ 2022-04-03 │
└─────────────┴─────────────────────┴────────────┘
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A001 │ www.virtualbing.fun │ 2022-05-01 │
│ A002 │ www.virtualbing.fun │ 2022-05-02 │
└──────┴─────────────────────┴────────────┘
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A005 │ www.virtualbing.fun │ 2022-06-03 │
│ A006 │ www.virtualbing.fun │ 2022-06-04 │
└──────┴─────────────────────┴────────────┘
```

## 复制分区数据

`ClickHouse` 支持将 `A` 表的分区数据复制到 `B` 表，这项特性可以用于快速数据写入、多表间数据同步和备份等场景，它的完整语法如下：

```sql
$ ALTER TABLE B REPLACE PARTITION partition_expr FROM A;
```

不过需要注意的是，并不是任意数据表之间都能够相互复制，他们还需要满足两个前提条件：

1. 两张表需要拥有**相同的分区键**。
2. 他们的**表结构完全相同**。

假设数据表 `partition_v2` 与先前的 `partition_v2` 分区键和表结构完全相同，那么应该现在 `partition_v1` 中写入一批 `7` 月份的数据：

```sql
$ INSERT INTO partition_v1 VALUES 
('A007-v1', 'www.baidu.com', '2022-07-01'), 
('A008-v1', 'www.virtualbing.cn', '2022-07-02'), 
('A009-v1', 'www.virtualbing.cn', '2022-07-03');
```

再执行下面的语句：

```sql
$ ALTER TABLE partition_v2 REPLACE PARTITION 202207 FROM partition_v1;
```

即能够将 `partition_v1` 的整个 `202207` 分区中的数据复制到 `partition_v2` 中：

```sql
$ SELECT * FROM partition_v2 ORDER BY EventTime;
┌─ID──────────┬─URL─────────────────┬──EventTime─┐
│ A000-update │ www.baidu.com       │ 2022-04-01 │
│ A003-update │ www.virtualbing.fun │ 2022-04-02 │
│ A004-update │ www.virtualbing.fun │ 2022-04-03 │
└─────────────┴─────────────────────┴────────────┘
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A001 │ www.virtualbing.fun │ 2022-05-01 │
│ A002 │ www.virtualbing.fun │ 2022-05-02 │
└──────┴─────────────────────┴────────────┘
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A005 │ www.virtualbing.fun │ 2022-06-03 │
│ A006 │ www.virtualbing.fun │ 2022-06-04 │
└──────┴─────────────────────┴────────────┘
┌─ID──────┬─URL────────────────┬──EventTime─┐
│ A007-v1 │ www.baidu.com      │ 2022-07-01 │
│ A008-v1 │ www.virtualbing.cn │ 2022-07-02 │
│ A009-v1 │ www.virtualbing.cn │ 2022-07-03 │
└─────────┴────────────────────┴────────────┘
```

## 重置分区数据

如果数据表某一列的数据有误，需要将其重置为初始值，此时可以使用下面的语句实现：

```sql
$ ALTER TABLE tb_name CLEAR COLUMN column_name IN PARTITION partition_expr
```

对于默认值的含义，应该遵循如下原则：

如果声明了默认值表达式，则以表达式为准；否则以相应数据类型的默认值为准。

例如，执行下面的语句会使 `partition_v2` 表内 `202207` 分区的 `URL` 数据重置。

```sql
$ ALTER TABLE partition_v2 CLEAR COLUMN URL in PARTITION 202207
```

查询数据后会发现， `URL` 字段已经成功被全部重置为空字符了（ `String` 类型的默认值）。

```sql
$ SELECT * FROM partition_v2;
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A005 │ www.virtualbing.fun │ 2022-06-03 │
│ A006 │ www.virtualbing.fun │ 2022-06-04 │
└──────┴─────────────────────┴────────────┘
┌─ID──────────┬─URL─────────────────┬──EventTime─┐
│ A000-update │ www.baidu.com       │ 2022-04-01 │
│ A003-update │ www.virtualbing.fun │ 2022-04-02 │
│ A004-update │ www.virtualbing.fun │ 2022-04-03 │
└─────────────┴─────────────────────┴────────────┘
┌─ID───┬─URL─────────────────┬──EventTime─┐
│ A001 │ www.virtualbing.fun │ 2022-05-01 │
│ A002 │ www.virtualbing.fun │ 2022-05-02 │
└──────┴─────────────────────┴────────────┘
┌─ID──────┬─URL─┬──EventTime─┐
│ A007-v1 │     │ 2022-07-01 │
│ A008-v1 │     │ 2022-07-02 │
│ A009-v1 │     │ 2022-07-03 │
└─────────┴─────┴────────────┘
```

## 卸载与装载分区

表分区可以通过 `DETACH` 语句**卸载**，分区被卸载后，它的物理数据并没有删除，而是被转移到了当前数据表目录的 `detached` 子目录下。而**装载**分区则是反向操作，它能够将 `detached` 子目录下的某个分区重新转载回去。卸载与装载这一对伴生的操作，常用于分区数据的**迁移**和**备份**场景。卸载某个分区的语法如下所示：

```sql
$ ALTER TABLE tb_name DETACH PARTITION partition_expr
```

例如，执行下面的语句能够将 `partition_v2` 表内整个 `7` 月分的分区卸载：

```sql
$ ALTER TABLE partition_v2 DETACH PARTITION 202207;
```

此时再次查询这种表，会发现其中 `2022` 年 `7` 月份的数据已经没有了。而进入 `partition_v2` 的磁盘目录，则可以看到被卸载的分区目录已经被移动到了 `detach` 目录中：

```bash
$ pwd
/var/lib/clickhouse/data/default/partition_v2/detached

$ ll
total 12
drwxr-x--- 3 clickhouse clickhouse 4096 Apr  9 07:33 ./
drwxr-x--- 6 clickhouse clickhouse 4096 Apr  9 07:33 ../
drwxr-x--- 2 clickhouse clickhouse 4096 Apr  9 07:33 202207_6_6_0_7/
```

记住，一旦分区被移动到了 `detached` 子目录，就代表它已经脱离了 `ClickHouse` 的管理， `ClickHouse` 并不会主动清理这些文件。这些分区文件会一直存在，除非我们主动删除或使用 `ATTACH` 语句重新装载它们。装载某个分区的完整语法如下所示：

```sql
$ ALTER TABLE tb_name ATTACH PARTITION partition_expr
```

再次执行下面的语句，就可以将刚才已被卸载的202207分区重新装载回去：

```sql
$ ALTER TABLE partition_v2 ATTACH PARTITION 202207;
```

## 备份与还原

关于分区数据的备份，可以通过 `FREEZE` 和 `FETCH` 实现。
