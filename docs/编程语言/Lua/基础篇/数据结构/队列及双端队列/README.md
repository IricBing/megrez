# 队列及双端队列

在 `Lua` 语言中实现队列的一种简单方法是使用 `table` 标准库中的函数 `insert` 和 `remove` 。正如我们之前所看到的，这两个函数可以在一个数组的任意位置插入或删除元素，同时根据所做的操作移动其他元素。不过，这种移动对于较大的结构来说开销很大。一种更高效的实现是使用**两个索引**，一个指向第一个元素，另一个指向最后一个元素。使用这种实现方式，我们就可以以 `O(1)` 时间复杂度同时在首尾两端插入或删除元素了。

```lua
function listNew ()
  return {first = 0, last = -1}
end

function pushFirst(list, value)
  local first = list.first - 1
  list.first = first
  list[first] = value
end

function pushLast(list, value)
  local last = list.last + 1
  list.last = last
  list[last] = value
end

function popFirst(list)
  local first = list.first
  if first > list.last then error("list is empty") end
  local value = list[first]
  list[first] = nil           -- 使得元素能够被垃圾回收
  list.first = first + 1
  return value
end

function popLast(list)
  local last = list.last
  if list.first > last then error("list is empty") end
  local value = list[last]
  list[last] = nil            -- 使得元素能够被垃圾回收
  list.last = last -1
  return value
end
```

如果希望严格地遵循队列的规范使用这个结构，那么就只能调用 `pushLast` 和 `popFirst` 函数， `first` 和 `last` 都会不断的增大。不多，由于我们在 `Lua` 语言中使用表来表示数组，所以我们既可以在 `1-20` 的范围内对数组进行索引，也可以在 `16777201-16777220` 的范围内索引数组。对于一个 `64` 位整数而言，以每秒**1000万次**的速度进行插入也需要运行**3万年**才会发生溢出的问题。
