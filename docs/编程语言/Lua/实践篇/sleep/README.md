# sleep

`Lua` 语言没有内置的 `Sleep` 函数, 有 `4` 种方法可以实现 `Sleep` 函数功能：

## 死循环

> [!warning]
> 强烈不推荐使用。

在一个**死循环**中设置一个跳出条件，但是这样的做法会占用大量 `CPU` 资源。

```lua
function Sleep(n)
  local t0 = os.clock()
  while os.clock() - t0 <= n do end
end
```

## 调用系统Sleep函数

> [!tip|label: 提示]
> 推荐在 `Linux` 系统中使用该方法

这种方法不消耗 `CPU` ，但是 `Windows` 系统中没有内置这个命令(或者使用 `Cygwin` )。

```lua
function Sleep(n)
  os.execute("sleep " .. n)
end
```

## ping

虽然Windows没有内置Sleep命令，但是利用ping命令的性质。

```lua
function Sleep(n)
  if n > 0 then os.execute("ping -n " .. tonumber(n + 1) .. " localhost > NUL") end
end
```

## socket.select

使用 `socket` 库中 `select` 函数, 可以传递 `0.1` 给 `n` , 使得休眠的时间精度达到**毫秒**级别。

```lua
‍require("socket")
function Sleep(n)
  socket.select(nil, nil, n)
end
```
