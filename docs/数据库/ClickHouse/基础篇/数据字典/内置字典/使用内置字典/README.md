# 使用内置字典

在知晓了内置字典的开启方式和 `Yandex.Metrica` 字典的数据模型之后，就可以配置字典的数据并使用它们了。首先，在 `/opt` 路径下新建 `geo` 目录：

```bash
$ mkdir /opt/geo
```

接着，将测试数据文件复制到这里：

```bash
$ ll /opt/geo
total 48
drwxr-xr-x 1 root root 4096 Apr 15 12:16 ./
drwxr-xr-x 1 root root 4096 Mar  9 07:34 ../
-rw-rw-r-- 1 1000 1000 3096 Apr 15 12:08 regions_hierarchy_ru.txt
-rw-rw-r-- 1 1000 1000 3096 Apr 15 12:08 regions_hierarchy.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_ar.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_by.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_en.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_kz.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_ru.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_tr.txt
-rw-rw-r-- 1 1000 1000 3957 Apr 15 12:08 regions_names_ua.txt
```

> [!tip|label: 测试资源]
> <a href="数据库/ClickHouse/基础篇/数据字典/内置字典/使用内置字典/assets/files/regions_test.tar.xz" download="regions_test.tar.xz">regions_test.tar.xz</a>

接下来按照[内置字典配置说明](../内置字典配置说明/README.md)中的方法启用内置字典。

至此，内置字典就已经全部设置好了，执行下面的语句就能够访问字典中的数据：

```sql
$ SELECT regionToName(toUInt32(20009));
┌─regionToName(toUInt32(20009))─┐
│ Buenos Aires Province         │
└───────────────────────────────┘
```

可以看到，对于 `Yandex.Metrica` 字典数据的访问，这里用到了 `regionToName` 函数。类似这样的函数还有很多，在 `ClickHouse` 中他们被称为 `Yandex.Matrica` 函数。关于这套函数的更多用法，请参阅[官方文档](https://clickhouse.com/docs/zh/sql-reference/functions/ym-dict-functions/)
