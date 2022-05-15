# 第一个示例

项目下载：<a href="编程语言/Lua/进阶篇/C语言API/总览/第一个示例/assets/files/demo.zip" download="demo.zip">demo.zip</a>

## 环境准备

> [!tip|label: 提示]
> 我们以 `Lua 5.3.5` 版本为例，操作系统为 `Ubuntu 20.04` ，使用[多版本](../../../../基础篇/环境配置/Ubuntu2004/多版本.md)的方式安装 `Lua 5.3.5` ，编辑器为 `VSCode` ，使用 `GCC` 编译。

新建工程目录（ `demo` 文件夹），将官网上下载下来的 `Lua 5.3.5` 版本[压缩包](http://www.lua.org/ftp/lua-5.3.5.tar.gz)解压，将其中的 `src` 文件夹拷贝到 `demo` 文件夹下，并改名为 `lua-5.3.5` 。接下来配置 `.vscode` 文件夹内的 `c_cpp_properties.json` 、 `extensions.json` 和 `settings.json` 文件，具体详见案例工程。

## 代码编写

建立 `main.c` 文件，写入如下内容：

```c
#include <stdio.h>
#include <string.h>

#include "lauxlib.h"
#include "lua.h"
#include "lualib.h"

int main(void) {
  char buff[256];
  int error;
  lua_State *L = luaL_newstate();  // 打开Lua
  luaL_openlibs(L);                // 打开L标准库

  while (fgets(buff, sizeof(buff), stdin) != NULL) {
    error = luaL_loadstring(L, buff) || lua_pcall(L, 0, 0, 0);
    if (error) {
      fprintf(stderr, "%s\n", lua_tostring(L, -1));
      lua_pop(L, 1);  // 从栈中弹出错徐信息
    }
  }

  lua_close(L);
  return 0;
}
```

## 编译运行

编译参考：https://blog.csdn.net/shjhuang/article/details/104548185

```bash
$ gcc -o main main.c /usr/local/lua-5.3.5/lib/liblua.a -ldl -lm -I lua-5.3.5
$ ./main

# 接下来会进入交互模式，可以将其认为是Lua的交互模式，输入代码得到信息
> a = "hello Iric"
> print(a)          --> hello Iric
> local a = 1; local b = 2; print(a + b)      --> 3
```

> [!tip|label: 提示]
> `/usr/local/lua-5.3.5/lib/liblua.a` 是 `Lua` 编译安装后才有的，我这里是使用了[多版本](../../../../基础篇/环境配置/Ubuntu2004/多版本.md)的方式安装了 `Lua 5.3.5` ，因此才是这个路径，如果采用**单版本**、 `apt` 等其他方式，可以采用 `$ locate liblua.a` 命令来查询文件位置。

## 说明

头文件 `lua.h` 声明了 `Lua` 提供的**基础函数**，其中包括创建新 `Lua` 环境的函数、调用 `Lua` 函数的函数、读写环境中的全局变量的函数，以及注册供 `Lua` 语言调用的新函数的函数等等。 `lua.h` 中声明的所有内容都有一个前缀： `lua_` 。例如： `lua_pcall` 。

头文件 `lauxlib.h` 声明了**辅助库**（ `auxiliary library` ， `auxlib` ）所提供的函数，其中所有的声明均以 `luaL_` 开头，例如： `luaL_loadstring` 。辅助库使用 `lua.h` 提供的基础 `API` 来提供更高层次的抽象，特别是对标准库用到的相关机制进行抽象。基础 `API` 追求**经济性**和**正交性**（ `orthogonality` ），而辅助库则追求对常见任务的**实用性**。当然，要在程序中创建其他所需要的抽象也是非常简单的。

> [!tip|label: 请记住]
> 辅助库不能访问 `Lua` 的内部元素，而只能通过 `lua.h` 中声明的官方基础 `API` 完成所有工作。辅助库能实现什么，你的程序就能实现什么。

`Lua` 标准库没有定义任何 `C` 语言全局变量，它将其所有的状态都保存在动态的结构体 `lua_State` 中， `Lua` 中的所有函数都接收一个指向该结构的**指针**作为参数。这种设计使得 `Lua` 是可重入的，并且可以直接用于编写**多线程**代码。

顾名思义，函数 `luaL_newstate` 用于创建一个新的 `Lua` 状态。当它创建一个新状态时，新环境中没有包含预定义的函数，甚至连 `print` 也没有。为了保持 `Lua` 语言的精炼，所有的标准库都被组织成不同的包，这样我们在不需要使用某些包时可以忽略他们。头文件 `lualib.h` 中声明了用于打开这些库的函数。函数 `luaL_openlibs` 用于打开所有的标准库。

当创建好一个状态并在其中加载标准库以后，就可以处理用户的输入了。程序会首先调用函数 `luaL_loadstring` 来编译用户输入的每一行内容，如果没有错误，则返回**零**，并向**栈**中压入编译后得到的函数。然后，程序调用 `lua_pcall` 从栈中弹出编译后的函数，并以**保护模式**（ `protected mode` ）运行。与函数 `luaL_loadstring` 类似，如果没有错误发生，函数 `lua_pcall` 返回**零**；当发生错误时，这两个函数都会向栈中压入一条错误信息。随后我们可以通过函数 `lua_tostring` 获取错误信息，并在打印出错误信息后使用函数 `lua_pop` 将其从栈中删除。

## 错误处理

在 `C` 语言中，真实的错误处理可能会相当复杂，并且如何处理错误取决于应用的性质。 `Lua` 核不会直接向任何输出流写入数据，它只会通过返回错误性信息来提示错误。每个应用可以用其所需的最恰当的方式来处理这些信息。为了简化讨论，假设以下示例使用如下简单的错误处理函数，即打印一条错误信息，关闭 `Lua` 状态并结束整个应用：

```c
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>

void error (lua_State *L, const char *fmt, ...){
  va_list argp;
  va_start(argp, fmt);
  vfprintf(stderr, fmt, argp);
  va_end(argp);
  lua_close(L);
  exit(EXIT_FAILURE);
}
```

## C++编译

由于 `Lua` 既可以作为 `C` 代码来编译，也可以作为 `C++` 代码来编译，因此 `lua.h` 中并没有包含以下这种在 `C` 标准库中的常见的写法：

```c
#ifdef __cplusplus
extern "C" {
#endif
  ...
#ifdef __cplusplus
}
#endif
```

如果将 `Lua` 作为 `C` 代码编译出来后又要在 `C++` 中使用，那么可以引入 `lua.hpp` 来替代 `lua.h` 。定义如下：

```C
extern "C" {
  #include "lua.h"
}
```
