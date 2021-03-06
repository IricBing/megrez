# 数据类型

## 简介

在 `C` 语言中，数据类型指的是**用于声明不同类型的 `变量` 或 `函数` 的一个广泛的系统**。变量的类型决定了变量存储占用的空间，以及如何解释存储的位模式。

`C` 中的类型可分为以下几种：

|类型|描述|
|-----|-----|
|基本类型|它们是 `算术类型` ，包括两种类型： `整数类型` 和 `浮点类型` |
|枚举类型|它们也是 `算术类型` ，被用来定义在程序中只能赋予其一定的 `离散整数值` 的变量|
| `void` 类型|类型说明符 `void` 表明**没有可用的值**|
|派生类型|它们包括： `指针类型` 、 `数组类型` 、 `结构类型` 、 `共用体类型` 和 `函数类型` |

**数组类型**和**结构类型**统称为 `聚合类型` 。**函数的类型指的是函数返回值的类型**。

## 整数类型

|类型|存储大小|值范围|
|-----|-----|-----|
| `char` | `1` 字节| `[-128,127]` 或 `[0,255]` |
| `unsigned char` | `1` 字节| `[0,255]` |
| `signed char` | `1` 字节| `[-128,127]` |
| `int` | `2` 字节或 `4` 字节| `[-32768,32767]` 或 `[-2147483648,2147483647]` |
| `unsigned int` | `2` 字节或 `4` 字节| `[0,65535]` 或 `[0,4294967295]` |
| `short` | `2` 字节| `[-32768,32767]` |
| `unsigned short` | `2` 字节| `[0,65535]` |
| `long` | `4` 字节| `[-2147483648,2147483647]` |
| `unsigned long` | `4` 字节| `[0,4294967295]` |

> [!warning|label:注意]
> 各种类型的存储大小与**系统位数**有关，但目前通用的以 `64位` 系统为主。

以下列出了 `32位` 系统与 `64位` 系统的存储大小的差别（ `windows` 相同）：

<table>
<tr>
<td>Compiler</td><td colspan="2">Windows vc12</td><td colspan="2">Linux gcc-5.3.1</td>
</tr>
<tr>
<td>Target</td><td>win32</td><td>x64</td><td>i686</td><td>x86_64</td>
</tr>
<tr>
<td>char</td><td>1</td><td> </td><td>1</td><td>1</td>
</tr>
<tr>
<td>unsigned char</td><td>1</td><td> </td><td>1</td><td>1</td>
</tr>
<tr>
<td>short</td><td>2</td><td> </td><td>2</td><td>2</td>
</tr>
<tr>
<td>unsigned short</td><td>2</td><td> </td><td>2</td><td>2</td>
</tr>
<tr>
<td>int</td><td>4</td><td> </td><td>4</td><td>4</td>
</tr>
<tr>
<td>unsigned int</td><td>4</td><td> </td><td>4</td><td>4</td>
</tr>
<tr>
<td>long</td><td>4</td><td> </td><td>4</td><td>8</td>
</tr>
<tr>
<td>unsigned long</td><td>4</td><td> </td><td>4</td><td>8</td>
</tr>
<tr>
<td>float</td><td>4</td><td> </td><td>4</td><td>4</td>
</tr>
<tr>
<td>double</td><td>8</td><td> </td><td>8</td><td>8</td>
</tr>
<tr>
<td>long int</td><td>4</td><td> </td><td>4</td><td>8</td>
</tr>
<tr>
<td>long long</td><td>8</td><td> </td><td>8</td><td>8</td>
</tr>
<tr>
<td>long double</td><td>8</td><td> </td><td>12</td><td>16</td>
</tr>
</table>

为了得到某个类型或某个变量在特定平台上的准确大小， `C` 语言提供 `sizeof` 运算符。表达式 `sizeof(type)` 得到对象或类型的存储字节大小。

示例代码：

```c
#include <stdio.h>
#include <limits.h>
 
int main()
{
   printf("int 存储大小 : %lu \n", sizeof(int));
   
   return 0;
}
```

> [!tip]
> 在 `Linux amd64` 环境下的输出结果：`int` 存储大小 : `4`

## 浮点类型

关于 `标准浮点类型` 的**存储大小**、**值范围**和**精度**信息如下表所示：

|类型|存储大小|值范围|精度|
|-----|-----|-----|-----|
| `float` | `4` 字节| `[1.2E-38, 3.4E+38]` | `6` 位小数|
| `double` | `8` 字节| `[2.3E-308, 1.7E+308]` | `15` 位小数|
| `long double` | `16` 字节| `[3.4E-4932, 1.1E+4932]` | `19` 位小数|

下面代码用来输出浮点类型占用的存储空间以及它的范围值：

```c
#include <stdio.h>
#include <float.h>
 
int main()
{
   printf("float 存储最大字节数 : %lu \n", sizeof(float));
   printf("float 最小值: %E\n", FLT_MIN );
   printf("float 最大值: %E\n", FLT_MAX );
   printf("精度值: %d\n", FLT_DIG );
   
   return 0;
}
```

在 `Linux amd64` 环境下的输出结果:

```
float 存储最大字节数 : 4 
float 最小值: 1.175494E-38
float 最大值: 3.402823E+38
精度值: 6
```

## `void` 类型

`void` 类型指定没有可用的值。它通常用于以下三种情况下：

### 函数返回为空

`C` 中有各种函数都不返回值，或者您可以说它们返回空。不返回值的函数的返回类型为空。例如 `void exit (int status); `

### 函数参数为空

`C` 中有各种函数不接受任何参数。不带参数的函数可以接受一个 `void` 。例如 `int rand(void); `

### 指针指向 `void`

类型为 `void *` 的指针代表**对象的地址**，而不是类型。例如，内存分配函数 `void *malloc( size_t size );` 返回指向 `void` 的指针，可以转换为任何数据类型。
