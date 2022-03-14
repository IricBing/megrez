# CMAKE_MINIMUM_REQUIRED

## 语法

```cmake
CMAKE_MINIMUM_REQUIRED(VERSION <version> LEVEL)
```

## 作用

定义 cmake 的最低兼容版本。

## 示例

```cmake
CMAKE_MINIMUM_REQUIRED(VERSION 2.5 FATAL_ERROR)
```

上述指令的含义是：如果 `cmake` 版本小于 `2.5` , 则出现严重错误, 整个过程中止。
