# 扩展字典的数据结构

扩展字典的数据结构由structure元素定义，由键值key和属性attribute两部分组成，它们分别描述字典的数据标识和字段属性。structure的完整形式如下所示：

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

key用于定义字典的键值，每个字典必须包含1个键值key字段，用于定位数据，类似数据库的表主键。键值key分为数值型和复合型两类。

### 数值型

数值型key由UInt64整型定义，支持flat、hashed、range_hashed和cache类型的字典，它的定义方法如下所示：

```xml
<structure>
  <id>
    <!-- 名称自定义 -->
    <name>Id</name>
  </id>
</structure>
```

### 复合型

复合型key使用Tuple元组定义，可以
