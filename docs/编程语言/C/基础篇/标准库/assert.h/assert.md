# assert()

> [!warning|label: 注意]
> `ASSERT` 只有在 `Debug` 版本中才有效，如果编译为 `Release` 版本则被**忽略**。

## 描述

`C` 库宏 `void assert(int expression)` 允许**诊断信息**被写入到**标准错误文件**中。换句话说，它可用于在 `C` 程序中添加诊断。

`ASSERT()` 是一个调试程序时经常使用的宏，在程序运行时它计算括号内的表达式，如果表达式为 `FALSE (0)` , 程序将报告错误，并终止执行。如果表达式不为 `0` ，则继续执行后面的语句。这个宏通常原来判断程序中是否出现了明显非法的数据，如果出现了终止程序以免导致严重后果，同时也便于查找错误。

## 语法

语法如下：

```c
void assert(int expression);
```

参数：

* `expression`：这可以是一个变量或任何 `C` 表达式。如果 `expression` 为 `TRUE`，`assert()` 不执行任何动作。如果 `expression` 为 `FALSE`，`assert()` 会在标准错误 `stderr` 上显示错误消息，并中止程序执行。

## 实例

```c
#include <assert.h>
#include <stdio.h>
 
int main()
{
  int a;
  char str[50];
    
  printf("请输入一个整数值： ");
  scanf("%d", &a);
  assert(a >= 10);
  printf("输入的整数是： %d\n", a);
  
  printf("请输入字符串： ");
  scanf("%s", str);
  assert(str != NULL);
  printf("输入的字符串是： %s\n", str);
  
  return(0);
}
```

让我们在交互模式下编译并运行上面的程序，如下所示：

```bash
请输入一个整数值： 11
输入的整数是： 11
请输入字符串： iricbing 
输入的字符串是： iricbing 
```
