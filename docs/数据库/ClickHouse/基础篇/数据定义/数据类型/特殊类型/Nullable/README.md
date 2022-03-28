# Nullable

准确来说， `Nullable` 并不能算是一种独立的数据类型，它更像是一种辅助的修饰符，需要与基础数据类型一起搭配使用。 `Nullable` 类型与 `Java8` 的 `Optional` 对象有些相似，它表示某个基础数据类型可以是 `Null` 值。其具体用法如下所示：

```sql
$ CREATE TABLE Null_TEST (
  c1 String,
  c2 Nullable(UInt8)
) ENGINE = TinyLog;
```

通过 `Nullable` 修饰后 `c2` 字段可以被写入 `Null` 值：

```sql
$ INSERT INTO Null_TEST VALUES ('nauu', null);
$ INSERT INTO Null_TEST VALUES ('bruce', 20);
$ SELECT c1, c2, toTypeName(c2) FROM Null_TEST;
┌─c1────┬───c2─┬─toTypeName(c2)──┐
│ nauu  │ NULL │ Nullable(UInt8) │
│ bruce │   20 │ Nullable(UInt8) │
└───────┴──────┴─────────────────┘
```

在使用 `Nullable` 类型的时候还有两点值得注意：

1. 它**只能和基础类型搭配使用**，不能用于**数组**和**元组**这些**复合类型**，也不能作为**索引字段**。
2. 应该慎用`Nullable`类型，包括`Nullable`的数据表，不然会使查询和写入性能变慢。

在正常情况下，每个列字段的数据会被存储在对应的 `[Column].bin` 文件中。如果一个列字段被 `Nullable` 类型修饰后，会额外生成一个 `[Column].null.bin` 文件专门保存它的 `Null` 值。这意味着在读取和写入数据时，需要一倍的额外文件操作。
