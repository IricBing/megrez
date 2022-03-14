# ADD_SUBDIRECTORY

## 语法

```cmake
ADD_SUBDIRECTORY(NAME)
```

## 作用

添加一个文件夹进行**编译**，该文件夹下的 `CMakeLists.txt` 负责编译该文件夹下的源码。 `NAME` 是想对于调用 `add_subdirectory` 的 `CMakeListst.txt` 的相对路径。
