# ADD_TEST

## 语法

```cmake
ADD_TEST(testname Exename arg1 arg2 ...)
```

## 作用

`testname` 是自定义的 `test` 名称， `Exename` 可以是构建的目标文件也可以是外部脚本等等。后面连接传递给可执行文件的参数。如果没有在同一个 `CMakeLists.txt` 中打开 `ENABLE_TESTING()` 指令， 任何 `ADD_TEST` 都是无效的。
