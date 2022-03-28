# Domain

域名类型分为IPv4和IPv6两类，本质上他们是对整型和字符串的进一步封装。IPv4类型是基于UInt32封装的，它的具体用法如下所示：

```sql
$ CREATE TABLE IP4_TEST (
  url String,
  ip IPv4
) ENGINE = Memory;

$ INSERT INTO IP4_TEST VALUES ('www.virtualbing.fun', '192.0.0.0');

$ SELECT url, ip, toTypeName(ip) FROM IP4_TEST;
```

> [!note]
> 执行失败： `Code: 50. DB::Exception: Unknown data type family: IPv4`
