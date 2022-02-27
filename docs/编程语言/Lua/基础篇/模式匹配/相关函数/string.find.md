# string.find

函数 `string.find` 用于在指定的目标字符串中搜索指定的模式。最简单的模式就是一个单词，它只会匹配到这个单词本身。例如，模式 `'hello'` 会在目标字符串中搜索子串 `"hello"` 。函数 `string.find` 找到一个模式后，会返回两个值：匹配到的模式**开始位置的索引**和**结束位置的索引**。如果没有找到任何匹配，则返回 `nil` 。

```lua
s = "hello word"
i, j = string.find(s, "hello")
print(i, j)                       --> 1   5
print(string.sub(s, i, j))        --> hello
print(string.find(s, "word"))     --> 7   11
i, j = string.find(s, "l")
print(i, j)                       --> 3   3
print(string.find(s, "lll"))      --> nil
```

匹配成功后，可以以函数 `find` 返回的结果为参数调用函数 `string.sub` 来获取目标字符串中模式匹配相应模式的子串。对于简单的模式来说，这一般就是模式本身。

函数 `string.find` 具有两个可选参数。第三个参数是一个**索引**，用于说明从目标字符串的那个位置开始搜索。第四个参数是一个**布尔值**，用于说明是否进行简单搜索。字如其名，**所谓简单搜索就是忽略模式而在目标字符串中进行单纯的"查找子字符串"的动作**：

```lua
> string.find("a [world]", "[")
stdin:1: malformed pattern (missing ']')
> string.find("a [world]", "[", 1, true)    --> 3   3
```

由于 `'['` 在模式中具有特殊含义，因此第一个函数调用会报错。在第二个函数调用中，函数只是把 `'['` 当做简单字符串。

> [!warning|label: 注意]
> 如果没有第三个参数，是不能传入第四个参数的。
