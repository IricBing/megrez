# 数据的写入

`INSERT` 语句支持**三种**语法范式，三种范式各不相同，可以根据写入的需求灵活运用。

## VALUES格式

使用 `VALUES` 格式的常规语法：

```sql
$ INSERT INTO [db.]table [(c1, c2, c3, ...)] VALUES (v11, v12, v13, ...), (v21, v22, v23, ...), ...
```

其中， `c1` 、 `c2` 、 `c3` 是列字段声明，可省略。 `VALUES` 后紧跟的是由元组组成的待写入数据，通过下标位与列字段声明**一一对应**。数据支持批量声明写入、多行数据之间使用**逗号**分割。例如执行下面的语句，将批量写入多条数据：

```sql
$ INSERT INTO partition_v2 VALUES 
('A000', 'www.baidu.com', '2022-04-01'), 
('A001', 'www.virtualbing.fun', '2022-05-01'), 
('A002', 'www.virtualbing.fun', '2022-05-02'), 
('A003', 'www.virtualbing.fun', '2022-04-02'), 
('A004', 'www.virtualbing.fun', '2022-04-03'), 
('A005', 'www.virtualbing.fun', '2022-06-03'), 
('A006', 'www.virtualbing.fun', '2022-06-04');
```

在使用 `VALUES` 格式的语法写入数据时，支持加入**表达式**或**函数**，例如：

```sql
$ INSERT INTO partition_v2 VALUES ('A0014', toString(1+2), now())
```

## 指定格式

使用指定格式的语法：

```sql
$ INSERT INTO [db.]table [(c1, c2, c3, ...)] FORMAT format_name data_set
```

`ClickHouse` 支持多种数据格式，以常用的 `csv` 格式写入为例：

```sql
$ INSERT INTO partition_v2 FORMAT CSV \
 'A0017', 'www.baidu.com', '2022-07-07' \
 'A0018', 'www.virtualbing.fun', '2022-07-08';
```

## SELECT 子句

使用 `SELECT` 子句形式的语法：

```sql
$ INSERT INTO [db.]table [(c1, c2, c3, ...)] SELECT ...
```

通过 `SELECT` 子句可将查询结果写入数据表，假设需要将 `partition_v1` 的数据写入 `partition_v2` ，则可以使用下面的语句：

```sql
$ INSERT INTO partition_v2 SELECT * FROM partition_v1;
```

在通过 `SELECT` 子句写入数据的时候，同样也支持加入**表达式**或**函数**，例如：

```sql
$ INSERT INTO partition_v2 SELECT 'A0020', 'www.virtualbing.fun', now();
```

## 总结

虽然 `VALUES` 和 `SELECT` 子句的形式都支持声明表达式或函数，但是表达式和函数会带来额外的**性能开销**，从而导致写入性能的下降。所以如果追求极致的写入性能，就应该尽可能避免使用他们。

`ClickHouse` 内部所有的数据操作都是面向 `Block` 数据库的，所以 `INSERT` 查询最终会将数据转换为 `Block` 数据块。也正因如此， `INSERT` 语句在单个数据库的写入过程中是具有**原子性**的。在默认情况下，每个数据块最多可以写入 `1048576` 行数据（由 `max_insert_block_size` 参数控制）。也就是说，如果一条 `INSERT` 语句写入的数据少于 `max_insert_block_size` 行，那么这批数据的写入是具有原子性的，即要么全部成功，要么全部失败。需要注意的是，只有在 `ClickHouse` 服务端处理数据的时候才具有这种原子写入的特性，例如使用 `JDBC` 或者 `HTTP` 接口时。因为 `max_insert_block_size` 参数在用 `CLI` 命令行或者 `INSERT SELECT` 子句写入时是不生效的。

> [!tip|label: 提示]
> 记住是 `100` 多万条即可。
