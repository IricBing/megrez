# cache

`cache` 字典只能够使用 `UInt64` 数值型 `key` ，它的字典数据在内从中会通过**固定长度的向量数组**保存。定长的向量数组又称 `cells` ，它的数组长度由 `size_in_cells` 指定。而 `size_in_cells` 的取值大小必须是 `2` 的**整数倍**，如若不是，则会自动向上取为 `2` 的倍数的整数。

`cache` 自带你的取数逻辑与其他字典有所不同，它并不会一次性将所有数据载入内存。当从 `cache` 字典中获取数据的时候，它首先会在 `cells` 数组中检查该数据是否已被缓存。如果数据没有被缓存，它才会从源头加载数据并缓存到 `cells` 中。所以 `cache` 字典是性能最不稳定的字典。因为它的性能优劣完全取决于缓存的**命中率**（缓存命中率=命中次数/查询次数），如果无法做到 `99%` 或者更高的缓存命中率，则最好不要使用此类型。完整示例如下：

在 `/etc/clickhouse-server` 目录下新建 `test_cache_dictionary.xml` 文件，写入如下内容：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_cache_dict</name>
    
    <source>
      <!-- 本地文件需要通过executable形式 -->
      <executable>
        <command>cat /var/lib/clickhouse/dictionaries_lib/organization.csv</command>
        <format>CSV</format>
      </executable>
    </source>

    <layout>
      <cache>
        <!-- 缓存大小 -->
        <size_in_cells>10000</size_in_cells>
      </cache>
    </layout>

    <!-- 与测试数据的结构对应 -->
    <structure>
      <id>
        <name>id</name>
      </id>

      <attribute>
        <name>code</name>
        <type>String</type>
        <null_value></null_value>
      </attribute>

      <attribute>
        <name>name</name>
        <type>String</type>
        <null_value></null_value>
      </attribute>
    </structure>

    <lifetime>
      <min>300</min>
      <max>360</max>
    </lifetime>

  </dictionary>
</dictionaries>
```

保存文件，再次查询系统中的所有字典：

```sql
$ SELECT name, type, key, attribute.names, attribute.types FROM system.dictionaries;
┌─name───────────────────┬─type─┬─key────┬─attribute.names─┬─attribute.types─────┐
│ test_cache_dict        │      │ UInt64 │ ['code','name'] │ ['String','String'] │
│ test_range_hashed_dict │      │ UInt64 │ ['price']       │ ['Float32']         │
│ test_hashed_dict       │      │ UInt64 │ ['code','name'] │ ['String','String'] │
│ test_flat_dict         │      │ UInt64 │ ['code','name'] │ ['String','String'] │
└────────────────────────┴──────┴────────┴─────────────────┴─────────────────────┘
```

在上述配置中， `layout` 被声明为 `cache` 并将缓存大小 `size_in_cells` 设置为 `10000` 。 关于 `cells` 的取值可以根据实际情况考虑，在内存宽裕的情况下设置为 `100000000` 也是可行的。还有一点需要注意，如果 `cache` 字典使用**本地文件**作为数据源，则必须使用e `xecutable` 的形式设置。
