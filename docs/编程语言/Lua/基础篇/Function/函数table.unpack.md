# 函数 table.unpack

多重返回值还涉及到一个特殊的函数table.unpack。该函数的参数是一个数组，返回值为数组内的所有元素：

```lua
print(table.unpack({10,20,30})) --> 10    20    30
a,b = table.unpack({10,20,30})  --> a=10, b=20, 30被丢弃
```

顾名思义，函数table.unpack与函数table.pack的功能相反。pack把参数列表转换成Lua语言中一个真实的列表（一个表），而unpack则把Lua语言中的真实的
