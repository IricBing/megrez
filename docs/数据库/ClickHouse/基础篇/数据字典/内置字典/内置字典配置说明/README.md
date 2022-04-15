# 内置字典配置说明

内置字典在默认的情况下是禁用状态，需要开启后才能使用。开启它的方式也十分简单，只需要将 `/etc/clickhouse-server/config.xml` 文件中 `path_to_regions_hierarchy_file` 和 `path_to_regions_names_files` 两项配置打开。

```xml
<path_to_regions_hierarchy_file>/opt/geo/regions_hierarchy.txt</path_to_regions_hierarchy_file>
<path_to_regions_names_files>/opt/geo/</path_to_regions_names_files>
```

这两项配置是**惰性加载**的，只有当字典首次被查询的时候才会触发加载动作。填充 `Yandex.Metirca` 字典的 `geo` 地理数据由两组模型组成，可以分别理解为地区数据的**主表**及**维度表**。这两组模型的数据分别由上述两项配置指定。

## path_to_regions_hierarchy_file

`path_to_regions_hierarchy_file` 等同于区域数据的**主表**，由 `1` 个 `regions_hierarchy.txt` 和多个 `regions_hierarchy_[name].txt` 区域层次的数据文件共同组成，缺一不可。其中 `[name]` 表示区域标识符，与 `i18n` 类似。这些 `TXT` 文件内的数据需要使用 `TabSeparated` 格式定义，其数据模型的格式如下所示：

|名称|类型|是否必填|说明|
|-----|-----|-----|-----|
|Region ID| `UInt32` |√|区域ID|
|Parent Region ID| `UInt32` |√|上级区域ID|
|Region Type| `UInt8` |√|区域类型|
|Population| `UInt32` |X|人口|

其中**区域类型**的取值如下：
* `1`：continent
* `3`：country
* `4`：federal district
* `5`：region
* `6`：city

## path_to_regions_names_files

`path_to_regions_names_files` 等同于区域数据的**维度表**，记录了与区域 `ID` 对应的区域名称。维度数据使用 `6` 个 `regions_names_[name].txt` 文件保存，其中 `[name]` 表示区域标识符与 `regions_hierarchy_[name].txt` 对应，目前包括 `ru` 、 `en` 、 `ua` 、 `by` 、 `kz` 和 `tr` 。上述这些区域的数据文件必须全部定义，这是因为内置字典在初次加载时，会一次性加载上述 `6` 个区域标识的数据文件。如果缺少任何一个文件就会抛出异常并导致初始化失败。

这些 `TXT` 文件内的数据同样需要使用 `TabSeparated` 格式定义，其数据模型的格式如下所示：

|名称|类型|是否必填|说明|
|-----|------|-----|-----|
|Region ID| `UInt32` |√|区域ID|
|Parent Name| `String` |√|区域名称|
