# 函数 table.unpack

多重返回值还涉及到一个特殊的函数table.unpack。该函数的参数是一个数组，返回值为数组内的所有元素：

```lua
print(table.unpack({10,20,30})) --> 10    20    30
a,b = table.unpack({10,20,30})  --> a=10, b=20, 30被丢弃
```

顾名思义，函数table.unpack与函数table.pack的功能相反。pack把参数列表转换成Lua语言中一个真实的列表（一个表），而unpack则把Lua语言中的真实的列表（一个表）转换成一组返回值，进而可以作为另一个函数的参数使用。

unpack函数的重要用途之一体现在泛型调用（generic call）机制中。泛型调用机制允许我们动态地调用具有任意参数的任意函数。例如，在IOS C中，我们无法编写泛型调用的代码，只能声明可变长参数的函数或使用函数指针来调用不同的函数。但是，我们仍然不能调用具有可变数量参数的函数，因为C语言中的每一个函数调用的实参个数是固定的，并且每个实参的类型也是固定的。而在Lua语言中，却可以做到这一点。

如果我们想通过数组a传入可变的参数来调用函数f，那么可以写成：

```lua
f(table.unpack(a))
```

unpack会返回a中的所有元素，而这些元素又被用作f的参数。例如，考虑如下代码：

```lua
print(string.find("hello","ll"))
```

可以使用如下的代码动态地构造一个等价的调用：

```lua
f = string.find
a = {"hello", "ll"}

print(f(table.unpack(a)))
```

通常，函数table.unpack使用长度操作符获取返回值的个数，因为该函数只能用于序列。不过，如果需要，也可以显示地限制返回元素的范围：

```lua
print(table.unpack({"Sun","Mon","Tue","Wed"},2,3))    --> Mon   Tue
```

虽然预定义的函数unpack是用C语言编写的，但是也可以利用递归在Lua语言中实现：

```lua
function unpack(t, i, n)
  i = i or 1
  n = n or #t
  if i <= n then
    return t[i], unpack(t, i+1, n)
  end
end
```

在第一次调用该函数时，只传入一个参数，此时i为1，n为序列长度；然后，函数返回t[1]即unpack(t, 2, n)返回的所有结果，而unpack(t, 2, n)又会返回t[2]及unpack(t, 3, n)返回的所有结果，依次类推，知道处理完n个元素为止。

> [!tip|label: 思考]
> 采用递归的方式会不会出现堆栈**内存溢出**？（js就会）
