# 变量

我们可以使用 `SET(set)` 来定义变量，语法如下：

```cmake
SET(VAR [VALUE] [CACHE TYPE DOCSTRING [FORCE]])
```

示例：

```cmake
SET (SRC_LST main.c other.c)
```

说明：用变量代替值，例子中定义 `SRC_LST` 代替后面的字符串。

我们可以使用 `${NAME}` 来获取变量的名称。

## 常用变量

