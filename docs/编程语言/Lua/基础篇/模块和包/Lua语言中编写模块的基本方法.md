# Lua语言中编写模块的基本方法

在 `Lua` 语言中创建模块的最简单方式是：创建一个表并将所有需要到处的函数放入其中，最后返回这个表。如下所示：

```lua
local M = {}

-- 创建一个新的复数
local function new (r, i)
  return {r = r, i = i}
end

M.new = new     -- 把'new'加到模块中

-- constant 'i'
M.i = new(0, 1)

function M.add(c1, c2)
  return new(c1.r + c2.r, c1.i + c2.i)
end

function M.sub(c1, c2)
  return new(c1.r - c2.r, c1.i - c2.i)
end

function M.mul(c1, c2)
  return new(c1.r*c2.r - c1.i*c2.i, c1.r*c2.i + c1.i*c2.r)
end

local function inv (c)
  local n = c.r^2 + c.i^2
  return new(c.r/n, -c.i/n)
end

function M.div(c1, c2)
  return M.mul(c1, inv(c2))
end

function M.tostring(c)
  return string.format("(%g,%g)", c.r, c.i)
end

return M
```

> [!tip|label: 思考]
> 思考上例中是如何通过简单地把 `new` 和 `inv` 声明为局部变量而使他们称为代码段的私有函数的。

如果不适用返回语句，还可以使用其省略方式：直接把模块对应的表放到 `package.loaded` 中：

```lua
local M = {}
package.loaded[...] = M     -- 跟之前一样，但没有返回语句
```

> [!warning|label: 注意]
> 函数 `require` 会把模块的名称作为第一个参数传给加载函数。因此，表索引中的可变长参数表达式 `...` 其实就是模块名。在这一赋值语句后，我们就不再需要在模块的最后返回 `M` 了。

如果一个模块没有返回值，那么函数 `require` 会返回 `package.loaded[modename]` 的当前值（如果不是 `nil` 的话）。不过，使用 `return` 返回的方式更加清晰，如果我们忘了 `return` 语句，那么在测试模块的时候很容易就会发现问题。

另一种编写模块的方法是把所有的函数定义为局部变量，然后在最后构造返回的表，如下所示：

```lua
local function new (r, i) return {r = r, i = i} end

-- 定义常量'i'
local i = complex.new(0,1)

-- 根之前一样的的其他函数

return {
  new = new,
  i = i,
  add = add,
  sub = sub,
  div = div,
  tostring = tostring
}
```

这种方式的**优点**在于：无需为每一个标识符前增加前缀 `M.` 或类似的东西。通过显式的导出表，我们能够以与在模块中相同的方式定义和使用导出的内部函数。这种方式的**缺点**在于，导出表位于模块最后面表示最前面（把前面的话当做简略文档的话更有用），而且由于必须把每个名字都写两遍，所以导出表有点**冗余**（这一缺点其实可能会变成优点，因为这允许函数在模块内和模块外具有不同的名称，不过程序会很少用到）。

不管怎样，无论怎样定义模块，用户都能用标准的方法使用模块：

```lua
local cpx = require "complex"
print(cpx.tostring(cpx.add(cpx.new(3, 4), cpx.i)))      --> (3, 5)
```
