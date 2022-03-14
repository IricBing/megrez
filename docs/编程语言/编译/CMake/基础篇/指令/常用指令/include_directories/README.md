# include_directories

```cmake
include_directories([AFTER|BEFORE] [SYSTEM] dir1 [dir2 ...])
```

## 作用

将给定目录添加到编译器用来搜索包含文件的目录中。相对路径被解释为**相对于当前源目录**。

包含目录添加到 `INCLUDE_DIRECTORIES` 当前 `CMakeLists` 文件的目录属性。它们也被添加到 `INCLUDE_DIRECTORIES` 当前 `CMakeLists` 文件中每个目标的 `target` 属性。目标属性值是生成器使用的属性值。
