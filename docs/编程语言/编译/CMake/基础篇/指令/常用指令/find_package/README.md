# find_package

## 语法

```cmake
find_package(<PackageName> [version] [EXACT] [QUIET] [MODULE] [REQUIRED] [[COMPONENTS] [components...]] [OPTIONAL_COMPONENTS components...] [NO_POLICY_SCOPE])
```

* `<PackageName>_FOUND`：将设置为指示是否找到该软件包。找到软件包后，将通过软件包本身记录的变量和“**导入的目标**”提供特定于软件包的信息。
  + `QUIET`选项禁用信息性消息，包括那些如果未找到则表示无法找到软件包的消息。
  + `REQUIRED`如果找不到软件包，该选项将**停止**处理并显示一条**错误消息**。
* `COMPONENTS`选项后（或`REQUIRED`选项后，如果有的话）可能会列出所需组件的特定于包装的列表 。后面可能会列出其他可选组件`OPTIONAL_COMPONENTS`。可用组件及其对是否认为找到包的影响由目标包定义。

## 作用

查找并从**外部项目**加载设置。
