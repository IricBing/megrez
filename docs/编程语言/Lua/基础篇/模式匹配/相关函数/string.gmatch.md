# string.gmatch

函数 `string.gmatch` 返回一个函数，通过返回的函数可以遍历一个字符串中所有出现的指定模式。例如，以下示例可以找出指定字符串 `s` 中出现的所有单词：

```lua
s = "some string"
words = {}
for w in string.gmatch(s, "%a+") do
  words[#words + 1] = w
end
```

模式 `"%a+"` 会匹配一个或多个字母组成的序列（也就是单词），因此， `for` 循环会遍历所有目标字符串中的单词，然后把他们保存到列表 `words` 中。
