# ADD_DEFINITIONS

## 语法

```cmake
ADD_DEFINITIONS(-DENABLE_DEBUG -DABC)
```

## 作用

向 `C/C++` 编译器添加 `-D` 定义。 如果你的代码中定义了 `#ifdef ENABLE_DEBUG #endif` ，这个代码块就会生效。
