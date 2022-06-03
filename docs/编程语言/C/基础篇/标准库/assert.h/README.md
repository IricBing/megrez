# assert.h

## 简介

`C` 标准库的 `assert.h` 头文件提供了一个名为 `assert` 的**宏**，它可用于验证程序做出的假设，并在假设为假时输出诊断消息。

已定义的宏 `assert` 指向另一个宏 `NDEBUG` ，宏 `NDEBUG` 不是 `<assert.h>` 的一部分。如果已在引用 `<assert.h>` 的源文件中定义 `NDEBUG` 为宏名称，则 `assert` 宏的定义如下：

```c
#define assert(ignore) ((void)0)
```

## 库宏

下面列出了头文件 `assert.h` 中定义的**唯一**的函数：

|函数|描述|
|-----|-----|
|[void assert(int expression)](assert.md)|这实际上是一个**宏**，不是一个函数，可用于在 `C` 程序中添加**诊断**。|
