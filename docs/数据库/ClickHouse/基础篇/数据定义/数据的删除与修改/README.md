# 数据的删除与修改

`ClickHouse` 提供了 `DELETE` 和 `UPDATE` 的能力，这类操作被称为 `Mutation` 查询，它可以看做 `ALTER` 语句的变种。虽然 `Mutation` 能最终实现修改和删除，但不能完全以通常意义上的 `UPDATE` 和 `DELETE` 来理解，我们必须清醒地认识到它的不同：
1. `Mutation`语句是一种“**很重**”的操作，更适用于**批量**数据的修改和删除。
2. 它不支持事务，一旦语句被提交执行，就会立刻对现有数据产生影响，**无法回滚**。
3. `Mutation`语句的执行是一个**异步**的后台过程，语句别提交之后就会立即返回。所以这并不代表具体逻辑已经执行完毕，它的具体执行进度需要通过`system.mutations`系统表查询。

`DELETE` 语句的完整语法如下所示：

```sql
$ ALTER TABLE [db_name.]table_name DELETE WHERE filter_expr
```

数据删除的范围由 `WHERE` 查询子句决定。例如，执行下面语句可以删除 `partition_v2` 表内所有 `ID` 等于 `A003` 的数据：

```sql
$ ALTER TABLE partition_v2 DELETE WHERE ID = 'A003';
```

由于演示的数据很少， `DELETE` 操作给人的感觉和常用 `OLTP` 数据库无异。但是我们心中应该要明白这是一个异步的的后台执行动作。

在此进入数据目录，让我们看看删除操作是如何实现的：

```bash
$ pwd
/var/lib/clickhouse/data/default/partition_v2

$ ll
total 56
drwxr-x--- 11 clickhouse clickhouse 4096 Apr  9 08:21 ./
drwxr-x---  3 clickhouse clickhouse 4096 Apr  9 06:55 ../
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 07:01 202204_4_4_0/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 08:21 202204_4_4_0_9/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 06:55 202205_2_2_0/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 08:21 202205_2_2_0_9/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 06:55 202206_3_3_0/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 08:21 202206_3_3_0_9/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 07:37 202207_8_8_0/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 08:21 202207_8_8_0_9/
drwxr-x---  2 clickhouse clickhouse 4096 Apr  9 07:37 detached/
-rw-r-----  1 clickhouse clickhouse    1 Apr  9 06:55 format_version.txt
-rw-r-----  1 clickhouse clickhouse   88 Apr  9 08:21 mutation_9.txt
```

可以发现，在执行了 `DELETE` 操作之后数据目录发生了一些变化。每一个原有的数据目录都额外增加了一个同名目录，并且在末尾处增加了 `_9` 的后缀。此外，目录下还多了一个名为 `mutation_9.txt` 的文件， `mutation_9.txt` 文件的内容如下所示：

```txt
format version: 1
create time: 2022-04-09 08:21:03
commands: DELETE WHERE ID = \'A003\'
```

原来 `mutation_9.txt` 是一个**日志文件**，它完整的记录了这次 `DELETE` 操作的执行语句和时间，而文件名的后缀 `_9` 与新增目录的后缀对应。那么后缀的数字是从而而来呢？继续查询 `system.mutations` 系统表，一探究竟：

```sql
$ SELECT database, table, mutation_id, block_numbers.number AS num, is_done FROM system.mutations;
┌─database─┬─table────────┬─mutation_id────┬─num─┬─is_done─┐
│ default  │ partition_v2 │ mutation_9.txt │ [9] │       1 │
└──────────┴──────────────┴────────────────┴─────┴─────────┘
```

至此，整个 `Mutation` 操作的逻辑就比较清晰了。每执行一条 `ALTER DELETE` 语句，都会在 `mutations` 系统表中生成一条对应的执行计划，当 `is_done` 等于 `1` 时表示**执行完毕**。与此同时，在数据表的根目录下，会以 `mutation_id` 为名生成与之对应的日志文件用于记录相关信息。而数据删除的过程是以数据表的每个分区目录为单位，将所有目录重写为新的目录，新目录的命名规则是在原有名称上加上 `system.mutations.block_numbers.number` 。数据在重新的过程中会将需要删除的数据去掉。就得数据目录并不会立即删除，而是会被标记成**未激活**状态（ `active` 为 `0` ）。等到 `MergeTree` 引擎的下一次合并动作触发时，这些非激活目录才会被真正从物理意义上删除。

数据修改除了需要指定具体的列字段之外，整个逻辑与数据删除别无二致，它的完整语法如下所示：

```sql
$ ALTER TABLE [db_name.]table_name UPDATE column1 = expr1 [, ...] WHERE filter_expr
```

`UPDATE` 支持在一条语句中同时定义多个修改字段，**分区键**和**主键**不能作为修改字段。例如，执行下面的语句即能够根据 `WHERE` 条件同时修改 `partition_v2` 内的 `URL` 和 `OS` 字段：

```sql
$ ALTER TABLE partition_v2 UPDATE URL = 'www.baidu.com', OS = 'mac' WHERE ID IN (SELECT ID FROM partition_v2 WHERE EventTime = '2022-04-01')
```
