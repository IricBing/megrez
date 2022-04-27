# 容量

## 查询数据库占用空间大小

```sql
$ WITH SUM(data_uncompressed_bytes) AS bytes 
SELECT database, formatReadableSize(bytes) AS format FROM system.columns 
GROUP BY database 
ORDER BY bytes DESC;
┌─database───────────┬─format────┐
│ system             │ 21.75 GiB │
│ dawen              │ 4.91 GiB  │
│ default            │ 0.00 B    │
│ INFORMATION_SCHEMA │ 0.00 B    │
│ information_schema │ 0.00 B    │
└────────────────────┴───────────┘
```