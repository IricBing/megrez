# 矩阵及多维数组

在 `Lua` 语言中，有两种方式来表示矩阵。第一种方式是使用一个**不规则数组**，即**数组的数组**，也就是一个所有元素均是另一个表的表。例如，可以使用如下代码来创建一个全 `0` 元素的 `NxM` 维矩阵：

```lua
local mt = {}         -- 创建矩阵
for i = 1, N do
  local row = {}      -- 创建新的一行
  mt[i] = row
  for j = 1, M do
    row[j] = 0
  end
end
```

由于表在 `Lua` 语言中是一种对象，因此在创建矩阵时必须显式地创建每一行。一方面，这比在 `C` 语言中直接声明一个多维数组更加具体；另一方面，这也给我们提供了更多的灵活性。例如，只需将前例中的内层循环 `for j = 1, i do ... end` 就可以创建一个**三角形矩阵**。使用这套代码，三角形矩阵较原来的矩阵可以节约一半的内存。

在 `Lua` 中表示矩阵的第二种方式是**将两个索引合并为一个**。典型情况下，我们通过将第一个索引乘以一个**合适的常量**再加上第二个索引来实现这种效果。在这种方式下，我们可以使用以下的代码来创建一个全 `0` 元素的 `NxM` 维矩阵：

```lua
local mt = {}
for i = 1, N do
  local aux = (i - 1) * M
  for j = 1, M do
    mt[aux + j] = 0
  end
end
```

应用程序会经常用到**稀疏矩阵**，这种矩阵中的大多数元素是 `0` 或 `nil` 。例如，我们可以使用**邻接矩阵**来表示**图**。当矩阵 `(m, n)` 处元素的值为 `x` 时，表示图中的节点 `m` 和 `n` 是相连的，连接的权重为 `x` ；如上述的两个节点不相连，那么矩阵的 `(m, n)` 处元素的值是 `nil` 。如果要表示一个具有 `1` 万个节点的图（其中每个节点有 `5` 个邻居），那么需要一个能包含 `1` 亿个元素的矩阵（ `1000列x1000行` 的方阵），但是其中大约只有 `5` 万个元素不为 `nil` （每行有 `5` 列不为 `nil` ，对应每个节点有 `5` 个邻居）。许多有关数据结构的书籍都会深入地讨论如何实现这种稀疏矩阵而不必浪费 `800M` 内存空间，但在 `Lua` 语言中却很少需要用到那些技巧。这是因为，我们使用表实现数组而表本来就是稀疏的。在第一种实现中（表的表），需要 `1` 万个表，每个表包含 `5` 个元素，总共 `5` 万个元素。在第二种实现中，只需要一个表，其中包含 `5` 万个元素。无论那种实现，都只有非 `nil` 的元素才占用空间。

由于在有效元素之间存在**空洞**( `nil` 值)，因此不能对稀疏矩阵使用**长度运算符**。这没什么大不了的。即使我们能够使用长度运算符，最好也不要这么做。对于大多数针对稀疏矩阵的操作来说，遍历空元素是非常低效的。相反，可以使用 `pairs` 来只遍历非 `nil` 的元素。例如，考虑如何进行由不规则数组表示的稀疏矩阵的矩阵乘法。

假设矩阵 `a[M,K]` 乘以矩阵 `b[K,N]` 的结果为矩阵 `c[M,N]` ，常见的矩阵相乘形式如下：

```lua
for i = 1, M do
  for j = 1, N do
    c[i][j] = 0
    for k = 1, K do
      c[i][j] = c[i][j] + a[i][k] * b[k][j]
    end
  end
end
```

外层的两个循环遍历了整个据结果矩阵，然后使用内层循环计算每一个元素的值。

对于使用不规则矩阵实现的稀疏矩阵，内存循环会有问题。由于内存循环遍历的是一列 `b` 而不是一行，因此不能在此处使用 `pairs` ：这个循环必须遍历每一行来检查对应的行为是否在对应列中有元素。除了遍历了少量非 `0` 元素外，这个循环还遍历了所有的 `0` 元素。（由于不知道元素的空间位置，所以在其他场景下遍历一列也可能会有问题）

以下的算法与之前的示例非常类似，但是该算法调换了两个内存循环的顺序。通过这个简单的调整，该算法避免了遍历列：

```lua
-- 假设'c'的元素都是0
for i = 1, M do
  for k = 1, K do
    for j = 1, N do
      c[i][j] = c[i][j] + a [i][k] * b[k][j]
    end
  end
end
```

这样，中间的一层循环遍历行 `a[i]` ，而内层循环遍历行 `b[k]` 。这两个遍历都可以使用 `pairs` 来实现仅遍历非 `0` 元素。由于一个空的稀疏矩阵本身就是使用 `0` 填充的，所以对结果矩阵 `c` 的初始化没有任何问题。

以下的示例展示了上述算法的完整实现，其中使用了 `pairs` 来处理稀疏的元素。这种实现只访问非 `nil` 元素，同时结果也是稀疏矩阵。此外，下面的代码还删去了结果中偶然为 `0` 的元素：

```lua
function mult (a, b)
  local c = {}                                              -- 结果矩阵
  for i = 1, #a do
    local resultline = {}                                   -- 即'c[i]'
    for k, va in pairs(a[i]) do                             -- 'va'即a[i][k]
      for j, vb in pairs(b[k]) do                           -- 'vb'即b[k][j]
        local res = (resultline[j] or 0) + va * vb
        resultline[j] = (res ~= 0) and res or nil
      end
    end
    c[i] = resultline
  end
  return c
end
```
