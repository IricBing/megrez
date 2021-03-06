# COLOR

## 功能

设置默认的控制台前景和背景颜⾊。

## 用法

```batch
COLOR [attr]
```

其中：

* `attr`：指定控制台输出的颜⾊属性。

颜⾊属性由两个**⼗六进制数字**指定。第⼀个为**背景**，第⼆个则为**前景**。每个数字可以为以下任何值之⼀:

|数字|颜色|
|-----|-----|
|0|黑色|
|1|蓝色|
|2|绿色|
|3|湖蓝色|
|4|红色|
|5|紫色|
|6|黄色|
|7|白色|
|8|灰色|
|9|淡蓝色|
|A|淡绿色|
|B|淡浅绿色|
|C|淡红色|
|D|淡紫色|
|E|淡黄色|
|F|亮白色|

如果没有给定任何参数，该命令会将颜⾊还原到 `CMD.EXE` 启动时的颜⾊。这个值来⾃当前控制台窗⼝、 `/T` 开关或 `DefaultColor` 注册表值。

如果⽤相同的前景和背景颜⾊来执⾏ `COLOR` 命令， `COLOR` 命令 会将 `ERRORLEVEL` 设置为 `1` 。 

例如: `"COLOR fc"` 在亮⽩⾊上产⽣亮红⾊。
