# ATTRIB

## 功能

显⽰或更改⽂件属性。

## 用法

```batch
ATTRIB [+R|-R] [+A|-A] [+S|-S] [+H|-H] [[drive:] [path] filename] [/S [/D]]
```

|参数|作用|
|-----|----|
| `+` |设置属性。|
| `-` |清除属性。|
| `R` |只读⽂件属性。|
| `A` |存档⽂件属性。|
| `S` |系统⽂件属性。|
| `H` |隐藏⽂件属性。|
| `[drive:][path][filename]` |指定要处理的⽂件属性。|
| `/S` | 处理当前⽂件夹及其⼦⽂件夹中的匹配⽂件。|
| `/D` |也处理⽂件夹。|

## 示例

```batch
md autorun 
attrib +a +s +h autorun
```

上⾯的命令将建⽴⽂件夹 `autorun` ，然后将其设为**存档**、**系统**、**隐藏属性**。
