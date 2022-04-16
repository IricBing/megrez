# 扩展字典配置文件的元素组成

扩展字典的配置文件由 `/etc/clickhouse-server/config.xml` 文件中的 `dictionaries_config` 配置项指定：

```xml
<!-- Configuration of external dictionaries. See:
      https://clickhouse.com/docs/en/sql-reference/dictionaries/external-dictionaries/external-dicts
-->
<dictionaries_config>*_dictionary.xml</dictionaries_config>
```

在默认情况下， `ClickHouse` 会自动识别并加载 `/etc/clickhouse-server` 目录下所有以 `_dictionary.xml` 结尾的配置文件。同时 `ClickHouse` 也能够动态感知此目录下配置文件的各种变化，并支持**不停机在线更新配置**。

在单个字典配置文件内可以定义过个字典，其中每一个字典由一组 `dictionary` 元素定义。在 `dictionary` 元素之下又分为 `5` 个子元素，均为必填项，他们完整的配置结构如下所示：

```xml
<?xml version="1.0"?>
<dictionaries>
  <dictionary>
    <name>dict_name</name>

    <structure>
      <!-- 字典的数据结构 -->
    </structure>

    <layout>
      <!-- 在内存中的数据格式类型 -->
    </layout>

    <source>
      <!-- 数据源配置 -->
    </source>

    <lifetime>
      <!-- 字典的自动更新频率 -->
    </lifetime>
  </dictionary>
</dictionaries>
```

在上述结构中，主要配置的含义如下：

|配置项|含义|说明|
|-----|-----|-----|
| `name` |字典的名称|用于确定字典的**唯一标识**，必须全局唯一，多个字典之间不允许重复|
| `structure` |字典的数据结构|详见：[扩展字典的数据结构](../扩展字典的数据结构/README.md)|
| `layout` |字典的类型|它决定了数据在内存中以何种结构组织和存储。目前扩展字典共拥有7中类型，详见：[扩展字典的类型](../扩展字典的类型/README.md)|
| `source` |字典的数据源|它决定了字典中数据从何处加载。目前扩展字典共拥有**文件**、**数据库**和**其他**三类数据来源，详见：[扩展字典的数据源](../扩展字典的数据源/README.md)|
| `lifetime` |字典的更新时间|扩展字典支持数据在线更新，详见：[扩展字典的数据更新策略](../扩展字典的数据更新策略/README.md)
