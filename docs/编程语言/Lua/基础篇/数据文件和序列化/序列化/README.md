# 序列化

我们常常需要将某些数据**序列化/串行化**，即将数据转换为**字节流**或**字符流**，以便将其存储到文件中或者通过网络传输。我们也可以将序列化后的数据表示为 `Lua` 代码，当这些代码运行时，被序列化的数据就可以在读取程序中得到**重建**。

通常，如果想要恢复一个全局变量的值，那么可能会使用形如 `varname=exp` 这样的代码。其中， `exp` 是用于创建这个值的 `Lua` 代码，而 `varname` 是一个简单的标识符。接下来，让我们学习如何编写创建值的代码。例如，对于一个数值类型而言，可以简单地使用如下代码：

```lua
function serialize(o)
  if type(o) == "number" then
    io.write(tostring(o))
  else 
    -- other cases
  end
end
```

不过，用十进制格式保存浮点数可能**损失精度**。此时，可以利用十六进制格式来避免这个问题，使用格式 `"%a"` 可以保留被读取浮点型数的原始精度。此外，由于 `从Lua5.3` 开始就对浮点型和整数类型进行了区分，因此通过使用正确的子类型就能够恢复他们的值。

```lua
local fmt = {integer = "%d", float = "%a"}

function serialize (o)
  if type(o) == "number" then
    io.write(string.format(fmt[math.type(o)], o))
  else
    -- other cases
  end
end
```

对于字符串类型的值，最简单的序列化方式形如：

```lua
if type(o) == "string" then
  io.write("'", o, "'")
```

不过，如果字符串包含特殊字符（比如引号或换行符），那么结果就会是错误的。

也许可以通过修改引号来解决这个问题：

```lua
if type(o) == "string" then
  io.write("[[", o, "]]")
```

这里，要当心**代码注入**（ `code injection` ）！如果某个恶意用户设法是程序保存了形如 `"]]..os.execute('rm *')..[["` 这样的内容（例如，恶意用户可以将其住址保存为该字符串），那么最终被保存下来的代码将变成：

```lua
varname = [[ ]]..os.execute("rm *")..[[]]
```

一旦这样的数据被加载，就会导致意想不到的后果。

我们可以使用一种安全的方法来括住一个字符串，那就是使用函数 `string.format` 的 `"%q"` 选项，该选项被设计为以一种能够让 `Lua` 语言安全地反序列化字符串的方式来序列化字符串，它使用**双引号**括住字符串并正确地转义其中的**双引号**和**换行符**等其他字符。

```lua
a = 'a "problematic" \\string'
print(string.format("%q", a))   --> "a \"problematic\" \\string"
```

通过使用这个特性，函数 `serialize` 将变为：

```lua
function serialize(o)
  if type(o) == "number" then
    io.write(string.format(fmt[math.type(o)], o))
  elseif type(o) == "string" then
    io.write(string.format("%q", o))
  else 
    -- other cases
  end
end
```

`Lua5.3.3` 对格式化选项 `"%q"` 进行了扩展，使其也可以用于**数值**、 `nil` 和 `Boolean` 类型，进而使他们能够正确地被序列化和反序列化。（特别地，这个格式选项以十六进制格式处理浮点类型以保留完整的精度。）因此，从 `Lua5.3.3` 开始，我们还能够对函数 `serialize` 进行进一步的简化和扩展：

```lua
function serialize (o)
  local t = type(o)
  if t == "number" or t == "string" or t == "boolean" or t == "nil" then
    io.write(string.format("%q", o))
  else
    -- other cases
  end
end
```

另一种保存字符串的方式是使用主要用于长字符串的 `[=[...]=]` ，那么还必须注意几个细节。首先，我们必须选择**恰当数量**的等号，这个恰当的数量应比原字符串中出现的最长等号序列的长度大 `1` . 由于在字符串中出现长等号序列很常见（例如代码中的注释），因此我们应该把注意力集中在以方括号开头的等号序列上。其次， `Lua` 语言总是会忽略长字符串开头的换行符，要解决这个问题可以通过一种简单方式，即总是在字符串开头多增加一个**换行符**（这个换行符会被忽略）。如下所示：

```lua
function quote (s)
  -- 寻找最长等号序列的长度
  local n = -1
  for w in string.gmatch(s, "]=*") do
    n = math.max(n, #w - 1) -- -1用于移除']'
  end

  -- 生成一个具有'n'+1个等号的字符串
  local eq = string.rep("=", n + 1)

  -- 创建被引起来的字符串
  return string.format(" [%s[\n%s]%s] ", eq, s, eq)
end
```

该函数可以接收任意一个字符串，并返回按长字符串对其进行格式化后的结果。函数 `gmatch` 创建一个遍历字符串 `s` 中所有匹配模式 `']=*'` 之处的迭代器（即右方括号后跟零个或多个等号）。在每个匹配的地方，循环会用当前所遇到的最大等号数量更新变量 `n` 。循环结束后，使用函数 `string.rep` 重复等号 `n+1` 次，也就是生成一个比原字符串中出现的最长等号序列的长度大 `1` 的等号序列。最后，使用函数 `string.format` 将 `s` 放入一对具有正确数量等号的方括号中，并在字符串 `s` 的开头插入一个**换行符**。
