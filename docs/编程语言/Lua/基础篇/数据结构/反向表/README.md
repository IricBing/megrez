# 反向表

正如之前提到的，我们很少在 `Lua` 语言中进行搜索操作。相反，我们使用被称为**索引表**或**反向表**的数据结构。

加入有一个存放了一周每一天名称的表：

```lua
days = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
```

如果想要将一周每一天的名称转换为其在一周里的位置，那么可以通过搜索这个表来寻找指定的名称。不过，一种更高效的方式是构建一个反向表，假定为 `revDays` ，该表中的索引为一周每一天的名称而值为其在一周里的位置。这个表形如：

```lua
revDays = {
  ["Sunday"] = 1,
  ["Monday"] = 2,
  ["Tuesday"] = 3,
  ["Wednesday"] = 4,
  ["Thursday"] = 5,
  ["Friday"] = 6,
  ["Saturday"] = 7,
}
```

然后，只需要直接在反向表中根据名称进行索引就可以了：

```lua
x = "Tuesday"
print(revDays[x])     --> 3
```

当然，这个反向表不用手工声明，可以从原始的表中自动地构造出反向表：

```lua
revDays = {}
for k, v in pairs(days) do
  revDays[v] = k
end
```

上例中的循环会对每个元素 `days` 进行赋值，变量 `k` 获取到的是键而变量 `v` 获取到的是值。
