# 闭包

在 `Lua` 语言中，函数是严格遵循 `词法定界` （**lexical scoping**）的第一类值。

`第一类值` 意味着 `Lua` 语言中的函数与其他常见类型的值（例如数值和字符串）具有同等权限：一个程序可以将某个函数保存到变量中（全局变量和局部变量均可）或表中，也可以将某个函数作为参数传递给其他函数，还可以将某个函数作为其他函数的返回值返回。

`词法定界` 意味着 `Lua` 语言中的函数可以访问包含其自身的外部函数中的变量（也意味着 `Lua` 语言完全支持 `Lambda` 演算）。

上述两个特性联合起来为 `Lua` 语言带来了极大地灵活性。例如，一个程序可以通过重新定义函数来增加新功能，也可以通过擦除函数来为不受信任的代码（例如通过网络接收到的代码）创建一个安全的运行时环境。更重要的是，上述两个特性允许我们在 `Lua` 语言中使用很多函数式语言的强大编程技巧。即使对函数式编程毫无兴趣，也不妨学习一下如何探索这些技巧，因为这些技巧可以使程序变得更加小巧和简单。
