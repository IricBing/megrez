# string.gsub

函数 `string.gsub` 有**三个必选参数**：**目标字符串**、**模式**和**替换字符串**，其基本功能是将目标字符串中所有出现模式的地方换成替换字符串。

```lua
s = string.gsub("Lua is cute", "cute", "great")
print(s)                                                --> Lua is great
s = string.gsub("all lii", "l", "x")
print(s)                                                --> axx xii
s = string.gsub("Lua is great", "Sol", "Sun")
print(s)                                                --> Lua is great
```

此外，该函数还有一个可选的第 `4` 个参数，用于**限制替换的次数**：

```lua
s = string.gsub("all lii", "l", "x", 1)
print(s)                                                --> axl lii
s = string.gsub("all lii", "l", "x", 2)
print(s)                                                --> axx lii
```

除了替换字符串外， `string.gsub` 的第三个参数也可以是一个**函数**或一个**表**，这个函数或表会被**调用**（或**检索**）以产生替换字符串；

函数 `string.gsub` 还会返回第二个结果，即**发生替换的次数**。
