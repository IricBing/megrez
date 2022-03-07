# 图形

像其他现代编程语言一样， `Lua` 语言也允许开发人员使用多种实现表示图，每种实现都有其所使用的特定算法。这里，我们接下来介绍一种简单的面向对象的实现方式，在这种实现中使用对象表示**节点**（实际上就是**表**），将**边**表示为节点之间的**引用**。

我们使用一个由两个字段组成的表来表示每个节点，即 `name` （节点的名称）和 `adj` （与此节点邻接的节点的集合）。由于我们会从一个文本文件中加载图对应的数据，所以需要能够根据节点的名称来寻找指定节点的方法。因此，我们使用了一个额外的表来建立节点和节点名称之间的映射。函数 `name2node` 可以根据指定节点的名称返回对应的节点：

```lua
local function name2node(graph, name)
  local node = graph[name]
  if not node then
    -- 节点不存在，创建一个新的节点
    node = {name = name, adj = {}}
    graph[name] = node
  end
  return node
end
```

构造图函数：

```lua
function readgraph()
  local graph = {}
  for line in io.lines() do
    -- 把一行分割为两个名字
    local namefrom, nameto = string.match(line, "($S+)$s+($S+)")
    -- 找到对应的节点
    local from = name2node(graph, namefrom)
    local to = name2node(graph, nameto)
    -- 把'to'增加到邻接集合'from'中
    from.adj[to] = true
  end
  return graph
end
```

该函数逐行地读取一个文件，文件的每一行中有两个节点名称，表示从第一个节点到第二个节点有一条边。对于每一行，调用函数 `string.match` 将一行中的两个节点的名称分开，然后根据名称找到对应的节点（如果需要的话则创建节点），最后将这些节点连接在一起。

寻找两个节点之间的路径：

```lua
function findpath(curr, to, path, visited)
  path = path or {}
  visited = visited or {}
  if visited[curr] then                                   -- 是否节点已经访问？
    return nil                                            -- 不存在路径
  end
  visited[curr] = true                                    -- 标记节点为已被访问
  path[#path + 1] = curr                                  -- 增加到路径中
  if curr == to then                                      -- 是否是最后一个节点？
    return path
  end
  -- 尝试所有的邻接节点
  for node in pairs(curr.adj) do
    local p = findpath(node, to, path, visited)
    if p then return p end
  end
  table.remove(path)                                      -- 从路径中删除节点
end
```

函数 `findpath` 使用深度优先遍历搜索两个节点之间的路径。该函数的第一个参数是当前节点，第二个参数是目标节点，第三个参数是用于保存从起点到当前节点的路径，最后一个参数为所有已被访问节点的集合（用于避免回路）。

> [!tip|label: 思考]
> 该算法是如何不通过节点名称而直接对节点进行操作的？例如，visited是一个节点的集合，而不是节点的名称集合。类似的，path也是一个节点的列表。
