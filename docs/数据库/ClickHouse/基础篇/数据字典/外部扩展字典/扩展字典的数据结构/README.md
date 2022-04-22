# 扩展字典的数据结构

扩展字典的数据结构由 `structure` 元素定义，由键值 `key` 和属性 `attribute` 两部分组成，它们分别描述字典的**数据标识**和**字段属性**。 `structure` 的完整形式如下所示：

```xml
<dictionary>
  <structure>
    <!-- <id>或<key> -->
    <id>
      <!-- Key属性 -->
    </id>

    <attribute>
      <!-- 字段属性 -->
    </attribute>
  </structure>
</dictionary>
```

## key

`key` 用于定义字典的**键值**，每个字典必须包含 `1` 个键值 `key` 字段，用于定位数据，类似数据库的表主键。键值 `key` 分为**数值型**和**复合型**两类。

### 数值型

数值型 `key` 由 `UInt64` 整型定义，支持 `flat` 、 `hashed` 、 `range_hashed` 和 `cache` 类型的字典，它的定义方法如下所示：

```xml
<structure>
  <id>
    <!-- 名称自定义 -->
    <name>Id</name>
  </id>
</structure>
```

### 复合型

复合型 `key` 使用 `Tuple` 元组定义，可以由 `1` 到多个字段组成，类似数据库中的复合主键。它仅支持 `complex_key_hashed` 、 `complex_key_cache` 和 `ip_trie` 类型的字典。其定义方法如下所示：

```xml
<structure>
  <key>
    <attribute>
      <name>field1</name>
      <type>String</type>
    </attribute>
    <attribute>
      <name>filed2</name>
      <type>UInt64</type>
    </attribute>
    <!-- 省略…… -->
  </key>
  <!-- 省略…… -->
</structure>
```

## attribute

`attribute` 用于定义字典的**属性字段**，字典可以拥有 `1` 到多个属性字段。它的完整定义方法如下所示：

```xml
<structure>
  <!-- 省略…… -->
  <attribute>
    <name>Name</name>
    <type>DataType</type>
    <!-- 空字符串 -->
    <null_value></null_value>
    <expression>generateUUIDv4()</expression>
    <hierarchical>true</hierarchical>
    <injective>true</injective>
    <is_object_id>true</is_object_id>
  </attribute>
  <!-- 省略…… -->
</structure>
```

在 `attribute` 元素下共有 `7` 个配置项，其中 `name` 、 `type` 和 `null_value` 为必填项。这些配置项的详细说明如下：

|配置名称|必填|默认值|说明|
|-----|-----|-----|-----|
| `name` |√||字段名称|
| `type` |√||字段类型，参加[数据类型](../../../数据定义/数据类型/README.md)|
| `null_value` |√||在查询时，条件 `key` 没有对应元素时的默认值|
| `expression` ||无表达式|表达式，可以调用函数或者使用运算符|
| `hierarchical` || `false` |是否支持层次结构|
| `injective` || `false` |是否支持集合**单射**优化。开启后，在后续的 `GROUP BY` 查询中，如果调用 `distGet` 函数通过 `key` 获取 `value` ，则该 `value` 直接从 `GROUP BY` 数据返回。|
| `is_object_id` || `false` |是否开启 `MongoDB` 优化，通过 `ObjectID` 对 `MongoDB` 文档执行查询|

> [!tip|label: 提示]
> 假设有两个集合 `A` 和 `B` 。如果集合 `A` 中的每个元素 `x` ，在集合 `B` 中都有一个**唯一**与之对应的元素 `y` ，那么集合 `A` 到 `B` 的映射关系就是**单射**。
