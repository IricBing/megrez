# SAMPLE 子句

SAMPLE 子句能够实现数据采样的功能，使查询仅返回采样数据而不是全部数据，从而有效减少查询负担。SAMPLE子句的采样机制是一种幂等设计，也就是说在数据不发生变化的情况下，使用相同的采样规则总是能够返回相同的数据，所以这项特性非常适合在那些可以接受近似查询结果的场合使用。例如在数据量十分巨大的情况下，对查询时效性的要求大于准确性时就可以尝试使用SAMPLE子句。

SAMPLE子句只能用于MergeTree系列引擎的数据表，并且要求在CREATE TABLE时声明SAMPLE BY抽样表达式，例如下面的语句：

```sql
$ CREATE TABLE hits_v1 (
  CounterID UInt64,
  EventDate DATE,
  UserID UInt64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(EventDate)
ORDER BY (CounterID, intHash32(UserID))
-- Sample Key 声明的表达式必须也包含在主键的声明中
SAMPLE BY intHash32(UserID)
```

SAMPLE BY 表示hits_v1内的数据，可以按照intHash32(UserID)分布后的结果采样查询。

在声明Sample Key的时候有两点需要注意：

1. SAMPLE BY所声明的表达式必须同时包含在主键的声明内。
2. Sample Key必须是Int类型，如若不是，ClickHouse在进行CREATE TABLE操作时也不会报错，但在数据查询时会得到如下类似异常：

```sql
Invalid sampling column type in storage parameters: Float32. Must by unsigned integer type.
```

SAMPLE 子句目前支持如下3中用法：

## SAMPLE factor

SAMPLE factor表示按因子系数采样，其中factor表示采样因子，它的取值支持0~1之间的小数。如果factor设置为0或者1，则效果等同于不进行数据采样。如下面的语句表示按10%的因子采样数据：

```sql
$ SELECT CounterID FROM hits_v1 SAMPLE 0.1;
```

factor也支持使用十进制的形式表述：

```sql
$ SELECT CounterID FROM hits_v2 SAMPLE 1/10;
```

在进行统计查询时，为了得到最终的近似结果，需要将得到的直接结果乘以采样系数。例如若想按0.1的因子采样数据，则需要将统计结果放大10倍：

```sql
SELECT count() * 10 FROM hits_v1 SAMPLE 0.1;
```

一种更为优雅的方式是借助虚拟字段_sample_factor来获取采样系数，并一次代替硬编码的形式。_sample_factor可以返回当前查询所对应的采样系数：

```sql
$ SELECT CounterID, _sample_factor FROM hits_v1 SAMPLE 0.1 LIMIT 2;
```

在使用_sample_factor之后，可以将之前的查询语句改写成如下形式：

```sql
$ SELECT count() * any(_sample_factor) FROM hits_v1 SAMPLE 0.1;
```


## SAMPLE rows

SAMPLE rows 表示按样本数量采样，其中rows表示至少采样多少行数据，它的取值必须是大于1的整数。如果rows的取值大于表内数据的总行数，则效果等于rows = 1（即不使用采样）。

下面的语句表示采样10000行数据：

```sql
$ SELECT count() FROM hits_v1 SAMPLE 10000;
```