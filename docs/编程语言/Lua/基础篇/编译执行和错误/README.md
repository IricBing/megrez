# 编译、执行和错误

虽然我们把 `Lua` 语言称为**解释型语言**，但 `Lua` 语言总是在运行代码前先**预编译源码为中间代码**（这没什么大不了的，很多解释型语言也这样做）。**编译阶段**的存在听上去超出了解释型语言的范畴，但解释型语言的区分并不在于源码是否被编译，而在于是否有能力（且轻易地）**执行动态生成的代码**。可以认为，正是由于诸如 `dofile` 这样函数的存在，才使得 `Lua` 语言能够被称为**解释型语言**。
