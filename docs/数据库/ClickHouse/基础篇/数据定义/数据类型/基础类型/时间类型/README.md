# 时间类型

时间类型分为 `DateTime` 、 `DateTime64` 和 `Date` 三类。 `ClickHouse` 目前没有时间戳类型。时间类型最高的精度是**秒**，也就是说，如果需要处理毫秒、微秒等大于秒分辨率的时间类型，则只能借助 `UInt` 类型实现。

## DateTime

`DateTime` 类型包含时、分、秒信息，精确到秒，支持使用字符串形式写入：

```sql
$ CREATE TABLE Datetime_TEST (
  c1 Datetime
) ENGINE = Memory;

-- 以字符串形式写入
$ INSERT INTO Datetime_TEST VALUES('2022-03-26 00:00:00');

$ SELECT c1, toTypeName(c1) FROM Datetime_TEST;
┌──────────────────c1─┬─toTypeName(c1)─┐
│ 2022-03-26 00:00:00 │ DateTime       │
└─────────────────────┴────────────────┘
```

## DateTime64

`DateTime64` 可以记录**亚秒**，它在 `DateTime` 之上增加了**精度**的设置，例如：

```sql
$ CREATE TABLE Datetime64_TEST (
  c1 Datetime64(3, 'Asia/Shanghai')
) ENGINE = Memory;

-- 以字符串形式写入
$ INSERT INTO Datetime64_TEST VALUES('2022-03-26 00:00:00');

$ SELECT c1, toTypeName(c1) FROM Datetime64_TEST;
```

> [!note]
> 运行失败，运行时间：**2022年3月26日**， `ClickHouse` 版本： `22.2.3` ， `ClickHouse client` 版本： `18.16.1` 。

## Date

`Date` 类型不包含具体的时间信息，只精确到**天**，它同样也支持字符串形式写入：

```sql
$ CREATE TABLE Date_TEST (
  c1 Date
) ENGINE = Memory;

-- 以字符串形式写入
$ INSERT INTO Date_TEST VALUES('2022-03-26');

$ SELECT c1, toTypeName(c1) FROM Date_TEST;
┌─────────c1─┬─toTypeName(c1)─┐
│ 2022-03-26 │ Date           │
└────────────┴────────────────┘
```
