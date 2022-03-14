# AUX_SOURCE_DIRECTORY

## 语法

```cmake
AUX_SOURCE_DIRECTORY(dir VARIABLE)
```

## 作用

发现一个目录下**所有**的**源代码文件**并将列表存储在一个变量中, 这个指令临时被用来自动构建源文件列表。因为目前 `cmake` 还不能自动发现新添加的源文件。

## 示例

```cmake
AUX_SOURCE_DIRECTORY(. SRC_LIST)
ADD_EXECUTABLE(main ${SRC_LIST})
```
