# 分区

## 分区查看

```sql
$ SELECT partition_id, name, part_type, active, table, database FROM system.parts WHERE table = 'table_name';
```

## 分区合并

```sql
$ optimize table [db.]table_name;
```
