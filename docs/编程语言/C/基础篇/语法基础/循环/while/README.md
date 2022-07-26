# while

## 语法

```c
while(condition)
{
   statement(s);
}
```

在这里， `statement(s)` 可以是一个单独的语句，也可以是几个语句组成的**代码块**。

`condition` 可以是任意的表达式，当为任意非零值时都为 `true` 。当条件为 `true` 时执行循环。 当条件为 `false` 时，退出循环，程序流将继续执行紧接着循环的下一条语句。

## 流程

[循环流程图](./assets/images/循环流程.drawio ':include :type=code')

> [!tip|label: 提示]
> `while` 循环的关键点是**循环可能一次都不会执行**。当条件为 `false` 时，会跳过循环主体，直接执行紧接着 `while` 循环的下一条语句。
