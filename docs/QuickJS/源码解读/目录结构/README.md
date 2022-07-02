# 目录结构

> [!tip|label: 提示]
> 主要介绍核心文件，辅助文件一笔带过。

|文件|功能作用|
|-----|-----|
| `quickjs.c` 、 `quickjs.h` |**主程序**位置（编译器和解释器功能实现都在这里）|
| `quickjs-atom.h` | 预定义的字符串|
| `quickjs-opcode.h` |字节码中的操作符定义|
| `qjsc.c` | 编译器程序 `qjsc` 的入口|
| `qjs.c` | `REPL` 交互解释器 `qjs` 的入口|
| `repl.js` | `REPL` 的实现|
| `qjscalc.js` | 数学计算器应用，支持**任意长度**的**整数**、**浮点数**、**分数**、**复数**、**多项式**、**矩阵**计算|
| `cutils.c` 、 ` cutils.h` |辅助函数|
| `list.h` | `klist` 实现|
| `libbf.c` 、 `libbf.h` | `BigFloat` 实现|
| `libregexp.c` 、 `libregexp.h` 、 `libregexp-opcode.h` |正则表达式实现|
| `libunicode.c` 、 `libunicode.h` 、 `libunicode-table.h` | `Unicode` 编码的支持|
| `quickjs-libc.c` 、 `quickjs-libc.h` | 暴露给 ` C` 程序使用的 `API` |
| `examples/` | 示例 `JS` 程序|
| `tests/` |测试程序|
| `doc/` |文档|
| `Makefile` | `QuickJS` 项目构建文件|
| `VERSION` | `QuickJS` 当前版本发布日期，这个有用，在构建的时候会有用的|
