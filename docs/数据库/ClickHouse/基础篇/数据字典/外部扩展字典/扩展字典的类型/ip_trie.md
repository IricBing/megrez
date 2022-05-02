# ip_trie

虽然同为复合型key的字典，但ip_trie字典却较为特殊，因为它只能指定单个String类型的字段，用于指代IP前缀。ip_trie字典的数据在内存中使用trie树结构保存，且专门用于IP前缀查询的场景，例如通过IP前缀查询对应的ASN信息。完整示例如下所示：


在 `/etc/clickhouse-server` 目录下新建 `test_ip_trie_dictionary.xml` 文件，写入如下内容：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_ip_trie_dict</name>
    
    <source>
      <!-- 准备好的测试数据 -->
      <file>
        <path>/var/lib/clickhouse/dictionaries_lib/asn.csv</path>
        <format>CSV</format>
      </file>
    </source>

    <layout>
      <ip_trie />
    </layout>

    <!-- 与测试数据的结构对应 -->
    <structure>
      <!-- 虽然是复合类型，但是只能设置单个String类型的字段 -->
      <key>
        <attribute>
          <name>prefix</name>
          <type>String</type>
        </attribute>
      </key>

      <attribute>
        <name>asn</name>
        <type>String</type>
        <null_value></null_value>
      </attribute>

      <attribute>
        <name>country</name>
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
┌─name─────────────────────────┬─type─┬─key──────────────┬─attribute.names───┬─attribute.types─────┐
│ test_ip_trie_dict            │      │ (String)         │ ['asn','country'] │ ['String','String'] │
│ test_complex_cache_dict      │      │ (UInt64, String) │ ['name']          │ ['String']          │
│ test_hashed_dict             │      │ UInt64           │ ['code','name']   │ ['String','String'] │
│ test_complex_key_hashed_dict │      │ (UInt64, String) │ ['name']          │ ['String']          │
│ test_range_hashed_dict       │      │ UInt64           │ ['price']         │ ['Float32']         │
│ test_flat_dict               │      │ UInt64           │ ['code','name']   │ ['String','String'] │
│ test_cache_dict              │      │ UInt64           │ ['code','name']   │ ['String','String'] │
└──────────────────────────────┴──────┴──────────────────┴───────────────────┴─────────────────────┘
```