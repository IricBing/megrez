# Array

数组有两种定义形式，常规方式 `array(T)` ：

```sql
$ SELECT array(1, 2) as a, toTypeName(a);
┌─a─────┬─toTypeName([1, 2])─┐
│ [1,2] │ Array(UInt8)       │
└───────┴────────────────────┘
```

或者简写 `[T]` ：

```sql
$ SELECT [1, 2];
┌─[1, 2]─┐
│ [1,2]  │
└────────┘
```

通过上述的例子可以发现，在查询时并不需要主动声明数组的元素类型。因为 `ClickHouse` 的数组拥有**类型推断**的能力。

推断依据：**以最小存储代价为原则，即使用最小可表达的数据类型**。

在上面的例子中， `array(1, 2)` 会通过自动推断将 `Uint8` 作为数组类型。但是在数组元素中如果存在 `Null` 值，则元素类型将变回 `Nullable` ，例如：

```sql
$ SELECT [1, 2, null] as a, toTypeName(a);
┌─a──────────┬─toTypeName([1, 2, NULL])─┐
│ [1,2,NULL] │ Array(Nullable(UInt8))   │
└────────────┴──────────────────────────┘
```

> [!warning|label: 注意]
> 在同一个数组内可以包含多种数据类型，例如数组 `[1, 2.0]` 是可行的。但各类型之间**必须兼容**，例如数组 `[1, '2']` 则会报错。

在定义表字段时，数组需要指定明确的元素类型，例如：

```sql
$ CREATE TABLE Array_TEST (
  c1 Array(String)
) engine = Memory
```
