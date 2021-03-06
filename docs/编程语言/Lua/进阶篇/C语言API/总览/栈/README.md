# 栈

`Lua` 和 `C` 之间通信的主要组件是无处不在的**虚拟栈**（ `stack` ），几乎所有 `API` 调用都是在操作这个栈中的值， `Lua` 与 `C` 之间所有的数据交换都是通过这个栈完成的。此外，还可以利用栈保存中间结果。

当我们向在 `Lua` 和 `C` 之间交换数据时，会面对两个问题：

1. 动态类型和静态类型体系之间不匹配
2. 自动内存管理和手动内存管理之间不匹配

在 `Lua` 中，如果我们写 `t[k] = v` , `k` 和 `v` 都可以是几种不同类型；由于元表的存在，甚至 `t` 也可以有不同的类型。然而，如果要在 `C` 语言中提供这种操作，任意给定的 `settable` 函数都必须有一个固定的类型。为了实现这样的操作，我们就需要好几十个不同的函数（为三个不同类型参数的每一种组合都要写一个函数）。

可以通过在 `C` 语言中声明某种联合体类型来解决这个问题，假设这种类型叫 `lua_Value` ，它能够表示 `Lu` a语言中所有的值。然后，可以把 `settable` 声明为：

```c
void lua_settable (lua_Value a, lua_Value k, lua_Value v);
```

这种方法有两个缺点。首先，我们很难将如此复杂的类型映射到其他语言中；而在设计 `Lua` 时，我们又要求 `Lua` 语言不仅能方便地与 `C/C++` 交互，而且还能与 `Java` 、 `Fortran` 、 `C#` 等其他语言方便交互。其次， `Lua` 语言会做垃圾收集：由于 `Lua` 语言引擎并不知道 `Lua` 中的一个表可能会被保存在一个 `C` 语言变量中，因此它可能会（错误地）认为这个表是垃圾并将其回收。

因此， `Lua API` 中没有定义任何类似与 `lua_Value` 的类型，而是使用栈在 `Lua` 和 `C` 之间交换数据。栈中的每个元素都能保存 `Lua` 中任意类型的值。当我们想要从 `Lua` 中获取一个值（例如一个全局变量的值）时，只需调用 `Lua` ， `Lua` 就会将指定的值压入栈中。当想要将一个值传给 `Lua` 时，首先要将这个值压入栈，然后调用 `Lua` 将其从栈中弹出即可。尽管我们仍然需要一个不同的函数将每种 `C` 语言类型的值压入栈，还需要另一个不同的函数从栈中弹出每种 `C` 语言类型的值，但是避免了过多的组合（ `combinatorial explosion` ）。另外，由于这个栈是 `Lua` 状态的一部分，因此垃圾收集器知道 `C` 语言正在使用那些值。

几乎 `C API` 中的所有函数都会用到栈。正如[第一个示例](../第一个示例/README.md)，函数 `luaL_loadstring` 将其结果留在栈中（不管是编译好的代码还是一条错误消息）；函数 `lua_pcall` 从栈中取出要用的函数，并且也会将错误信息留在栈中。

`Lua` 严格地按照 `LIFO` （**Last In First Out**，**后进先出**）的规则来操作栈。在调用 `Lua` 时，只有栈**顶部**的部分会发生改变；而 `C` 语言代码则有更大的自由度。更具体的说， `C` 语言可以检视栈中的任何一个元素，甚至可以在栈的任意位置插入或删除元素。
