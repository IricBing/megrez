# EXEC_PROGRAM

## 语法

```cmake
EXEC_PROGRAM(Executable [directory in which to run]
                [ARGS <arguments to executable>]
                [OUTPUT_VARIABLE <var>]
                [RETURN_VALUE <var>])
```

## 作用

在 `CMakeLists.txt` 处理过程中执行命令，并不会在生成的 `Makefile` 中执行。用于在指定的目录运行某个程序，通过 `ARGS` 添加参数，如果要获取输出和返回值，可通过 `OUTPUT_VARIABLE` 和 `RETURN_VALUE` 分别定义两个变量。

这个指令可以帮助你在 `CMakeLists.txt` 处理过程中支持任何命令，比如根据系统情况去修改代码文件等等。
