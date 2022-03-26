# Enum

`ClickHouse` 支持枚举类型，这是一种在定义常量时经常会使用的数据类型。 `ClickHouse` 提供了 `Enum8` 和 `Enum16` 两种枚举类型，他们除了取值范围不同之外，别无二致。枚举固定使用 `(String: Int)Key/value` 键值对的形式定义数据，所以 `Enum8` 和 `Enum16` 分别会对应 `(String: Int8)` 和 `(String: Int16)` ，例如：

```sql
$ CREATE TABLE Enum_TEST (
  c1 Enum8('read' = 1, 'start' = 2, 'success' = 3, 'error' = 4)
) ENGINE = Memory;
```

在定义枚举集合的时候，有以下几点需要注意：

1. `Key`和`Value`是不允许重复的，要保证唯一性。
2. `Key`和`Value`的值都不能为`Null`，但`Key`允许是空字符串。
3. 在写入枚举数据的时候，只会用到`Key`字符串部分。

如下所示：

```sql
$ INSERT INTO Enum_TEST VALUES ('read');
$ INSERT INTO Enum_TEST VALUES ('start');
```

数据在写入的过程中，会对照枚举集合项的内容逐一检查。如果Key字符串不在集合范围内则会抛出异常，比如执行下面的语句就会出错：

```sql
$ INSERT INTO Enum_TEST VALUES('stop');
Exception on client:
Code: 49. DB::Exception: Unknown element 'stop' for type Enum8('read' = 1, 'start' = 2, 'success' = 3, 'error' = 4)
```

> [!tip|label: 提示]
> **Q**：枚举类型完全可以使用 `String` 替代，为什么还需要专门的枚举类型呢？
> **A**：这是出于**性能**的考虑，因为虽然枚举定义中的 `Key` 属于 `String` 类型，但是在后续对枚举的所有操作中（包括**排序**、**分组**、**去重**、**过滤**等），会使用 `Int` 类型的 `Value` 值。
