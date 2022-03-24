# 字符串类型

字符串类型可以细分为 `String` 、 `FixedString` 和 `UUID` 三类。从命名来看仿佛不像是由一款数据库提供的类型，反而更像是一门编程语言的设计。

## String

字符串由 `String` 定义，长度不限。因此在使用 `String` 的时候无需声明大小。它完全代替了传统意义上数据库的 `Varchar` 、 `Text` 、 `Clob` 和 `Blob` 等字符类型。 `String` 类型不限定字符集，因为它根本就没有这个概念，所以可以将任意编码的字符串存入其中。但是为了程序的规范性和可维护性，在同一套程序中应该遵循使用统一的编码，例如“**统一保持UTF-8编码**”就是一种很好的约定。

## FixedString

`FixedString` 类型和传统意义上的 `Char` 类型有些类似，对于一些字符有**明确长度**的场合，可以使用固定长度的字符串。定长字符串通过 `FixedString(N)` 声明，其中 `N` 表示**字符串长度**。但与 `Char` 不同的是， `FixedString` 使用 `null` 字节填充末尾字符，而 `Char` 通常使用**空格**填充。

```sql
$ SELECT toFixedString('abc', 5), LENGTH(toFixedString('abc', 5)) AS LENGTH
┌─toFixedString('abc', 5)─┬─LENGTH─┐
│ abc                     │      5 │
└─────────────────────────┴────────┘
```

> [!note|label: 说明]
> 字符串 `'abc'` 虽然只有 `3` 位，但长度却是 `5` ，因为末尾有 `2` 位**空字符填充**。

## UUID

`UUID` 是一种数据库常见的主键类型，在 `ClickHouse` 中直接把它作为一种数据类型。 `UUID` 共有 `32` 位，它的格式为 `8-4-4-4-12` 。如果一个 `UUID` 类型的字段在写入数据时没有被赋值，则会依照格式使用 `0` 填充，例如：

```sql
$ CREATE TABLE UUID_TEST (
  c1 UUID,
  c2 String
) ENGINE = Memory;

-- 第一行UUID有值
$ INSERT INTO UUID_TEST SELECT generateUUIDv4(), 't1';

-- 第二行UUID没有值
$ INSERT INTO UUID_TEST(c2) VALUES ('t2');

$ SELECT * FROM UUID_TEST;
┌───────────────────────────────────c1─┬─c2─┐
│ 00000000-0000-0000-0000-000000000000 │ t2 │
└──────────────────────────────────────┴────┘
┌───────────────────────────────────c1─┬─c2─┐
│ f3fe6b42-2669-42f8-aba1-a5dc52f9e2ec │ t1 │
└──────────────────────────────────────┴────┘
```

可以看到， `t2` 没有被赋值的 `UUID` 被 `0` 填充了。
