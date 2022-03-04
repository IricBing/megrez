# 集合与包

## 集合

假设我们想列出一个程序源代码中所有的标识符，同时过滤掉其中的保留字。一些 `C` 程序员可能更倾向于使用字符串数组来表示保留字集合。然后搜索这个数组来决定某个单词是否属于该集合。为了提高搜索的速度，他们还可能会使用二叉树来表示该集合。

在 `Lua` 语言中，还可以用一种高效且简单的方式来表示这类集合，即将集合元素作为索引放在表中。那么，对于指定的元素无需再搜索表，只需用该元素检索表并检查结果是否为 `nil` 即可。以上述需求为例，代码形如：

```lua
reserved = {
  ["while"] = true,
  ["if"] = true,
  ["else"] = true,
  ["do"] = true
}

for w in string.gmatch(s, "[%a_][%w_]*") do
  if not reserved[w] then
    -- 不是保留字处理
  end
end
```

> [!tip|label: 提示]
> 在定义 `reserved` 时，由于 `while` 是 `Lua` 原因的保留字，所以不能直接写成 `while = true` ，而应该写成 `["while"] = true`

我们可以借助一个辅助函数来构造集合，使得初始化过程更清晰：

```lua
function Set(list)
  local set = {}
  for _, l in ipairs(list) do set[l] = true end
  return set
end

reserved = Set({"while", "end", "function", "local"})
```

我们还可以使用另一个集合来保存标识符：

```lua
local ids = {}
for w in string.gmatch(s, "[%a_][%w_]*") do
  if not reserved[w] then
    ids[w] = true
  end
end

-- 输出每一个标识符
for w in pairs(ids) do print(w) end
```

## 包

**包**，也被称为**多重集合**，与普通集合的不同之处在于其中的元素可以出现多次。在 `Lua` 语言中，包的简单表示类似于此前集合的表示，只不过其中的每一个键都有一个对应的计数器。如果要插入一个元素，可以递增其计数器：

```lua
function insert (bag, element)
  bag[element] = (bag[element] or 0) + 1
end
```

如果要删除一个元素，可以递减其计数器：

```lua
function remove (bag, element)
  local count = bag[element]
  bag[element] = (count and count > 1) and count -1 or nil
end
```

只有当计数器存在其大于 `0` 时我们才会保留计数器。
