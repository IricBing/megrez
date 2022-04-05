# setlocal 与变量延迟

> [!tip|label: 提示]
> **要想进阶，变量延迟是必过的⼀关！**

## 批处理运⾏命令的机制

批处理读取命令时是**按⾏读取**的（另外例如 `for` 命令等，其后⽤⼀对圆括号闭合的所有语句也当作⼀⾏），在处理之前要完成必要的**预处理**⼯作，这其中就包括对该⾏命令中的变量赋值。

## 变量延迟

看一个例子：

```batch
@echo off 
set a=4 
set a=5 & echo %a% 
pause
```

输出：

```txt
4
```

批处理在运⾏到这句 `set a=5 & echo %a%` 之前，先把这⼀句整句读取并做了预处理——对变量 `a` 赋了值，那么 `%a%` 当然就是 `4` 了！

> [!note]
> 没有为什么，批处理就是这样做的。

⽽为了能够感知环境变量的**动态变化**，批处理设计了**变量延迟**。简单来说，在读取了⼀条完整的语句之后，不⽴即对该⾏的变量赋值，⽽会在某个单条语句执⾏之前再进⾏赋值， 也就是说**延迟**了对变量的赋值。

### 使用

变量延迟的启动语句是 `setlocal enabledelayedexpansion` ，并且变量 要⽤⼀对叹号 `!!` 括起来（注意要⽤英⽂的叹号），否则就没有变量延迟的效果。

对上面的示例进行一定的修改：

```batch
@echo off 
setlocal enabledelayedexpansion
set a=4 
set a=5 & echo !a! 
pause
```

输出：

```txt
5
```

### 示例1

```batch
@echo off

setlocal enabledelayedexpansion

for /l %%i in (1,1,5) do (
  set a=%%i
  echo !a!
)
pause
```

输出：

```txt
1
2
3
4
5
```

如果不使用变量延迟：

```batch
@echo off

for /l %%i in (1,1,5) do (
  set a=%%i
  echo %a%
)
pause
```

输出：

```txt
ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。
```

### 示例2

交换两个变量的值，且不⽤中间变量

```batch
@echo off

set var1=abc
set var2=123
echo 交换前： var1=%var1% var2=%var2%
set var1=%var2% & set var2=%var1%
echo 交换后： var1=%var1% var2=%var2%
pause
```

输出：

```txt
交换前： var1=abc var2=123
交换后： var1=123  var2=abc
```