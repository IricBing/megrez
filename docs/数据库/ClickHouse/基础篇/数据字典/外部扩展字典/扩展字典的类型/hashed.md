# hashed

`hashed` 字典同样只能够使用 `UInt64` 数值型 `key` ，但与 `flat` 字典不同的是， `hashed` 字典的数据在内存中通过**散列**结构保存，且**没有存储上限的制约**。如下所示的是创建 `hashed` 字典的示例：

在 `/etc/clickhouse-server` 目录下新建 `test_hashed_dictionary.xml` 文件，写入如下内容：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_hashed_dict</name>
    
    <source>
      <!-- 准备好的测试数据 -->
      <file>
        <path>/var/lib/clickhouse/dictionaries_lib/organization.csv</path>
        <format>CSV</format>
      </file>
    </source>

    <layout>
      <hashed />
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
┌─name─────────────┬─type─┬─key────┬─attribute.names─┬─attribute.types─────┐
│ test_hashed_dict │      │ UInt64 │ ['code','name'] │ ['String','String'] │
│ test_flat_dict   │      │ UInt64 │ ['code','name'] │ ['String','String'] │
└──────────────────┴──────┴────────┴─────────────────┴─────────────────────┘
```
