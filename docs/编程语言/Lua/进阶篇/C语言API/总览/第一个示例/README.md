# 第一个示例

项目下载：<a href="编程语言/Lua/进阶篇/C语言API/总览/第一个示例/assets/files/demo.zip" download="demo.zip">demo.zip</a>

## 环境准备

> [!tip|label: 提示]
> 我们以 `Lua 5.3.5` 版本为例，操作系统为 `Ubuntu 20.04` ，编辑器为 `VSCode` ，使用 `GCC` 编译。

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
```
