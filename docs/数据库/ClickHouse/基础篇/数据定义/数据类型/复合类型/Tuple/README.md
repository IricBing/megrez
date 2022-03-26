# Tuple

**元组**类型有 `1~n` 个元素组成，每个元素之间允许设置不同的数据类型，且彼此之间要求**兼容**。元组同样支持**类型推断**，其推断依据仍然是以**最小存储代价**为原则。与数组类似，元组也可以使用两种方式定义，常规方式 `tuple(T)` ：

```sql
$ SELECT tuple(1, 'a', now()) as x, toTypeName(x);
┌─x─────────────────────────────┬─toTypeName(tuple(1, 'a', now()))─┐
│ (1,'a','2022-03-26 09:06:32') │ Tuple(UInt8, String, DateTime)   │
└───────────────────────────────┴──────────────────────────────────┘
```

或者简写方式 `(T)` ：

```sql
$ SELECT (1, 2.0, null) as x, toTypeName(x);
┌─x──────────┬─toTypeName((1, 2., NULL))────────────────┐
│ (1,2,NULL) │ Tuple(UInt8, Float64, Nullable(Nothing)) │
└────────────┴──────────────────────────────────────────┘
```

在定义表字段时，元组也需要指定明确的元素类型：

```sql
$ CREATE Tuple_TEST (
  c1 Tuple(String, Int8)
) ENGINE = Memory;
```

元素类型和泛型的作用类似，可以进一步保障数据质量。在数据写入的过程中会进行类型检查。例如，写入 `INSERT INTO Tuple_TEST VALUES( ('abc', 123) )` 是可行的，而写入 `INSERT INTO Tuple_TEST VALUES(('abc', 'efg))` 则会报错。
