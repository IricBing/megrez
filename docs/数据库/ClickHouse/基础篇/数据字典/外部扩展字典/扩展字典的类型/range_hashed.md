# range_hashed

`range_hashed` 字典可以看做 `hashed` 字典的变种，它在原有功能的基础上增加了指定时间区间的特性，数据会以散列结构存储并按照时间排序。时间区间通过 `range_min` 和 `range_max` 元素指定，所指定的字段必须是 `Date` 或 `DateTime` 类型。

现在仿照 `hashed` 字典的配置，创建一个名为 `test_range_hashed_dictionary.xml` 的配置文件，将 `layout` 改为 `range_hashed` 并增加 `range_min` 和 `range_max` 元素。它的完整示例如下所示：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>test_range_hashed_dict</name>
    
    <source>
      <!-- 准备好的测试数据 -->
      <file>
        <path>/var/lib/clickhouse/dictionaries_lib/sales.csv</path>
        <format>CSV</format>
      </file>
    </source>

    <layout>
      <range_hashed />
    </layout>

    <!-- 与测试数据的结构对应 -->
    <structure>
      <id>
        <name>id</name>
      </id>

      <range_min>
        <name>start</name>
      </range_min>

      <range_max>
        <name>end</name>
      </range_max>

      <attribute>
        <name>price</name>
        <type>Float32</type>
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
│ test_range_hashed_dict │      │ UInt64 │ ['price']       │ ['Float32']         │
│ test_hashed_dict       │      │ UInt64 │ ['code','name'] │ ['String','String'] │
│ test_flat_dict         │      │ UInt64 │ ['code','name'] │ ['String','String'] │
└────────────────────────┴──────┴────────┴─────────────────┴─────────────────────┘
```