# GOTO 和 :

在批处理中允许以 `:XXX` 来构建⼀个**标号**，然后⽤ `GOTO XXX` 跳转到标号 `:XXX` 处，然后执⾏标号后的命令。

示例：

```batch
if {%1}=={} goto noparms 
if "%2"=="" goto noparms
```

标签的名字可以随便起，但是最好是有意义的字符串。前加个冒号⽤来表⽰这个字符串是标签， `goto` 命令就是根据这个冒号（ `:` ）来寻找下⼀步跳到到那⾥。

> [!tip|label: 提示]
> 使用 `GOTO` 语句的时候最好有⼀些说明，这样你别⼈看起来才会理解你的意图。

## 示例程序

```batch
@echo off 
:start set /a var+=1 
echo %var% 
if %var% leq 3 GOTO start 
pause
```

运行输出：

```txt
1
2
3
4
```
