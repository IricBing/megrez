# string.match

由于函数 `string.match` 也用于在一个字符串中搜索模式，因此它与函数 `string.find` 非常相似。不过，函数 `string.match` 返回的是目标字符串中与模式相匹配的那部分子串，而非该模式所在的位置，如下所示：

```lua
print(string.match("hello word", "hello"))    --> hello
```

对于诸如 `'hello'` 这样固定的模式，使用这个函数并没有什么意义。然而，当模式是变量时，这个函数的强大之处就体现出来了，例如：

```lua
date = "Today is 28/2/2022"
d = string.match(date, "%d+/%d+/%d+")
print(d)                                    --> 28/2/2022
```
