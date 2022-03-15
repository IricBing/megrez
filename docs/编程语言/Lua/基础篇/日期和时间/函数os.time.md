# 函数 os.time

不带任何参数调用函数 `os.time` ，会以**数字**形式返回当前的日期和时间：

```lua
> os.time()   --> 1647351282
```

对应的时间为：在一个 `POSIX` 系统中，可以使用一些基本的数字运算分离这个数值：

```lua
local date = 1647351282
local day2year = 365.242
local sec2hour = 60 * 60
local sec2day = sec2hour * 24
local sec2year = sec2day * day2year

-- 年
print(date // sec2year + 1970)          --> 2022.0

-- 小时（UTC格式）
print(date % sec2day // sec2hour)       --> 13

-- 分钟
print(date % sec2hour // 60)            --> 34

-- 秒
print(date % 60)                        --> 42
```

如果以一个日期表作为参数调用函数 `os.time` ，那么该函数会返回表中所描述日期和时间对应的数字。 `year` 、 `month` 和 `day` 字段是必需的， `hour` 、 `min` 和 `sec` 字段如果没有提供的话则默认为 `12:00:00` ，其余字段（包括 `wday` 和 `yday` ）则会被忽略。

```lua
> os.time({year = 2022, month = 3, day = 15, hour = 13, min = 34, sec = 42})        --> 1647322482
> os.time({year = 1970, month = 1, day = 1, hour = 0})                              --> -28800
> os.time({year = 1970, month = 1, day = 1, hour = 0, sec = 1})                     --> -28799
```

> [!warning|label: 注意]
> `28800` 是 `8` 个小时的秒数，因为我们在**东八区**。
