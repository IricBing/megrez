# flat

`flat` 字典是所有类型中**性能最高**的字典类型，它只能使用 `UInt64` 数值型 `key` 。顾名思义， `flat` 字典的数据在内存中使用数组结构保存，数组的初始大小为 `1024` ，上限为 `500 000` ，这意味着它最多只能保存 `500 000` 行数据。如果在创建字典时数据量超出其上限，那么字典会创建失败。如下所示是通过手动创建的 `flat` 字典配置文件。

在 `/etc/clickhouse-server` 目录下新建 `test_flat_dictionary.xml` 文件，写入如下内容：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_flat_dict</name>
    
    <source>
      <!-- 准备好的测试数据 -->
      <file>
        <path>/var/lib/clickhouse/dictionaries_lib/organization.csv</path>
        <format>CSV</format>
      </file>
    </source>

    <layout>
      <flat />
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

写入文件后**无需重启**， `ClickHouse` 就会**自动识别**到这个文件，并建立字典。

在上述的配置中， `source` 数据源是 `CSV` 格式的文件， `structure` 数据结构与其对应。查验 `system.dictionaries` 系统表后，能够看到 `flat` 字典已经创建成功。

```sql
$ SELECT name, type, key, attribute.names, attribute.types FROM system.dictionaries;
┌─name───────────┬─type─┬─key────┬─attribute.names─┬─attribute.types─────┐
│ test_flat_dict │      │ UInt64 │ ['code','name'] │ ['String','String'] │
└────────────────┴──────┴────────┴─────────────────┴─────────────────────┘
```
