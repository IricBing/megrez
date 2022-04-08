# 数据库

数据库起到了**命名空间**的作用，可以有效规避命名冲突的问题，也为后续的数据隔离提供了支撑。**任何一张数据表，都必须归属在某个数据库之下**。

创建数据库的完整语法如下所示：

```sql
CREATE DATABASE IF NOT EXISTS db_name [ENGINE = engine];
```

其中:
1. `IF NOT EXISTS`表示如果已经存在一个同名的数据库，则会忽略后续的创建过程；
2. `[ENGINE = engine]`表示数据库所使用的引擎类型。

数据库目前一共支持 `5` 种引擎，如下所示：

1. `Ordinary`：**默认引擎**，在绝大多数情况下我们都会使用默认引擎，使用时无需刻意声明。在此数据库下可以使用**任意类型**的表引擎。
2. `Dictionary`：**字典引擎**，此类数据库会自动为所有的数据字典创建他们的数据表。
3. `Memory`：**内存引擎**，用于存放临时数据。此类数据库下的数据表只会停留在内存中，不会涉及任何磁盘操作，当服务重启后数据会被清除。
4. `Lazy`：**日志引擎**，此类数据库下只能使用`Log`系列的表引擎。
5. `MySQL`：**MySQL引擎**，此类数据库下会自动拉取远端`MySQL`中的数据，并为他们创建`MySQL`**表引擎**的数据表。

在绝大多数情况下都只需要使用默认的数据库引擎。

```sql
CREATE DATABASE DB_TEST
```

默认数据库的实质是物理磁盘上的一个**文件目录**，所以在语句执行之后， `ClickHouse` 便会在**安装路径**下创建 `DB_TEST` 数据库的文件目录:

```bash
# pwd
/chbase/data

# ls
DB_TEST default system
```

与此同时，在 `metadata` 路径下也会一同创建用于恢复数据库的 `DB_TEST.sql` 文件：

```bash
# pwd
/chbase/data/metadata

# ls
DB_TEST DB_TEST.sql default system
```

使用 `SHOW DATABASES` 查询，即能够返回 `ClickHouse` 当前的数据库列表：

```sql
$ SHOW DATABASES
┌─name───────────────┐
│ DB_TEST            │
│ INFORMATION_SCHEMA │
│ default            │
│ information_schema │
│ system             │
└────────────────────┘
```

使用 `USE` 查询可以实现在多个数据库之间进行切换，而通过 `SHOW TABLES` 查询可以查看当前数据库的数据表列表。删除一个数据库，则需要用到下面的 `DROP` 查询：

```sql
$ DROP DATABASE [IF EXISTS] db_name
```
