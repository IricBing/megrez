# complex_key_cache

complex_key_cache字典与cache字典的特性完全相同，只是将单个数值型key替换成了复合型。完整示例如下：

在 `/etc/clickhouse-server` 目录下新建 `test_complex_key_cache_dictionary.xml` 文件，写入如下内容：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_complex_cache_dict</name>
    
    <source>
      <!-- 本地文件需要通过executable形式 -->
      <executable>
        <command>cat /var/lib/clickhouse/dictionaries_lib/organization.csv</command>
        <format>CSV</format>
      </executable>
    </source>

    <layout>
      <complex_key_cache>
        <!-- 缓存大小 -->
        <size_in_cells>10000</size_in_cells>
      </complex_key_cache>
    </layout>

    <!-- 与测试数据的结构对应 -->
    <structure>
      <!-- 复合型key -->
      <key>
        <attribute>
          <name>id</name>
          <type>UInt64</type>
        </attribute>
        <attribute>
          <name>code</name>
          <type>String</type>
        </attribute>
      </key>

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
┌─name─────────────────────────┬─type─┬─key──────────────┬─attribute.names─┬─attribute.types─────┐
│ test_complex_cache_dict      │      │ (UInt64, String) │ ['name']        │ ['String']          │
│ test_hashed_dict             │      │ UInt64           │ ['code','name'] │ ['String','String'] │
│ test_complex_key_hashed_dict │      │ (UInt64, String) │ ['name']        │ ['String']          │
│ test_range_hashed_dict       │      │ UInt64           │ ['price']       │ ['Float32']         │
│ test_flat_dict               │      │ UInt64           │ ['code','name'] │ ['String','String'] │
│ test_cache_dict              │      │ UInt64           │ ['code','name'] │ ['String','String'] │
└──────────────────────────────┴──────┴──────────────────┴─────────────────┴─────────────────────┘
```