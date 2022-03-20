# 使用协程实现多线程

协程能够实现一种协作式多线程。每个协程都等价于一个线程。一对 `yield-resume` 可以将执行权在不同线程之间切换。不过，与普通的多线程不同，协程是**非抢占**的。当一个协程正在运行时，是无法从外部停止它的。只有当协程显示地要求时（通过调用函数 `yield` ）它才会挂起执行。对于有些应用而言，这并没有问题，而对于另外一些应用则不行。当不存在抢占时，编程简单很多。由于在程序中所有的线程间同步都是显式的，所以我们无需为线程同步问题抓狂，只需要确保一个协程只在它的临界区之外调用 `yield` 即可。

不过，对于非抢占式多线程来说，只要有一个线程调用了阻塞操作，整个程序在该操作完成前都会阻塞。对于很多应用程序来说，这种行为是无法接受的，而这也正是导致许多程序员不把协程看作传统多线程的一种实现的原因。接下来，我们会用一个有趣（且显而易见）的方法来解决这个问题。

让我们假设一个典型的多线程场景：我们希望通过 `HTTP` 下载多个远程文件。为了下载多个远程文件，我们必须先知道如何下载一个远程文件。在本例中，我们将使用 `LuaSocket` 标准库。要下载一个文件，必须先打开一个到对应站点的连接，然后发送下载文件的请求，接收文件（按块），最后关闭连接。在 `Lua` 语言中，可以按以下步骤来完成这项任务。首先，加载 `LuaSocket` 库：

```lua
local socket = require "socket"
```

然后，定义主机和要下载的文件。在本例中，我们从 `Lua` 语言官网下载 `Lua5.3` 的手册：

```lua
host = "www.lua.org"
file = "/manual/5.3/manual.html"
```

接下来，打开一个 `TCP` 连接，连接到该站点的 `80` 端口（ `HTTP` 协议的默认端口）：

```lua
c = assert(socket.connect(host, 80))
```

这步操作返回一个连接对象，可以用它来发送下载文件的请求：

```lua
local request = string.format("GET %s HTTP/1.0\r\nhost: %s\r\n\r\n", file, host)
c:send(request)
```

接下来，以 `1KB` 为一块读取文件，并将每块写入到标准输出中：

```lua
repeat
  local s, status, partial = c:receive(2^10)
  io.write(s or partial)
until status == "closed"
```

函数 `receive` 要么返回它读取到的字符串，要么在发生错误时返回 `nil` 外加**错误码**及出错前读取到的内容。当主机关闭连接时，把输入流中剩余的内容打印出来，然后退出接受循环。

下载完文件后，关闭连接：

```lua
c:close()
```

既然我们知道了如何下载一个文件，那么再回到下载多个文件的问题上。最简单的做法是逐个地下载文件。不过，这种串行的做法太慢了，它只能在下载一个文件后再下载一个文件。当读取一个远程文件时，程序把大部分的时间耗费在了等待数据到大上。更准确的说，程序将时间耗费在了多 `receive` 的阻塞调用上。因此，如果一个程序能够同时并行下载所有文件的话，就会快很多。当一个连接没有可用数据时，程序便可以从其他连接读取数据。很明显，协程为构造这种并发下载的代码结构提供了一种简便的方式。我们可以为每个下载任务创建一个新线程，当一个线程无可用数据时，它就可以将控制权传递给一个简单的调度器，这个调度器再去调用其他的线程。

在用协程重写程序前，我们先把之前的代码重写成一个函数。如下所示：

```lua
function download(host,file)
  local c = assert(socket.connect(host, 80))
  local count = 0     -- 计算读取的字节数
  local request = string.format("GET %s HTTP/1.0\r\nhost: %s\r\n\r\n", file, host)
  c:send(request)
  while true do
    local s, status = receive(c)
    count = count + #s
    if status == "closed" then break end
  end
  c:close()
  print(file, count)
end
```

由于我们对远程文件的内容并不感兴趣，所以不需要将文件内容写入到标准输出中，只要计算并输出文件大小即可。

> [!tip|label: 提示]
> 多个线程同时读取多个文件时，输出的结果也是乱的

在新版代码中，我们使用一个辅助函数 `receive` 从连接接收数据。在串行的下载方式中， `receive` 的代码如下：

```lua
function receive (connection)
  local s, status, partial = conenction:receive(2^10)
  return s or partial, status
end
```

在并行的实现中，这个函数在接收数据时不能阻塞。因此，在没有足够的可用数据时，该函数会挂起，如下所示：

```lua
function receive(connection)
  connection:settimeout(0)    -- 不阻塞
  local s, status, partial = connection:receive(2^10)
  if status == "timeout" then
    coroutine.yield(connection)
  end
  return s or partial, status
end
```

调用 `settimeout(0)` 使得后续所有对连接进行的操作不会阻塞。如果返回状态为 `"timeout"` ，就表示该操作在返回时还未完成。此时，线程就会挂起。传递给 `yield` 的非假参数通知调度器线程仍在执行任务中。

> [!warning|label: 注意]
> 即使在超时的情况下，连接也会返回超时前已读取到的内容，也就是变量 `partial` 中的内容。

```lua
tasks = {}    -- 所有活跃任务的列表

function get (host, file)
  -- 为任务创建协程
  local co = coroutine.wrap(function ()
    download(host, file)
  end)
  -- 将其插入列表
  table.insert(tasks, co)
end

function dispatch ()
  local i = 1
  while true do
    if tasks[i] == nil then   -- 没有其他任务了？
      if tasks[1] == nil then   -- 列表为空？
        break   -- 从循环中退出
      end
      i = 1
    end
    local res = tasks[i]()    -- 运行一个任务
    if not res then           -- 任务结束？
      table.remove(tasks, i)
    else
      i = i + 1   -- 处理下一个任务
    end
  end
end
```

表tasks为调度器保存着所有正在运行中的线程的列表。函数 `get` 保证每个下载任务运行在一个独立的线程中。调度器本身主要就是一个循环，它遍历所有的线程，逐个唤醒他们。调度器还必须在线程完成任务后，将该线程从列表中删除。在所有线程都完成运行后，调度器停止循环。

最后，主程序创建所有需要的线程并调起调度器。例如，如果要从 `Lua` 官网上下载几个发行包，主程序可能如下：

```lua
get("www.lua.org", "/ftp/lua-5.3.2.tar.gz")
get("www.lua.org", "/ftp/lua-5.3.1.tar.gz")
get("www.lua.org", "/ftp/lua-5.3.0.tar.gz")
get("www.lua.org", "/ftp/lua-5.2.4.tar.gz")
get("www.lua.org", "/ftp/lua-5.2.3.tar.gz")

dispatch()    -- 主循环
```

尽管速度提高了，但是最后一种实现还有很大的优化空间。当至少有一个线程有数据可读取时不会有问题。然而，如果所有的线程都没有数据可读，调度程序就会陷入**忙等待**（ `busy wait` ），不断地从一个线程切换到另一个线程来检查是否有数据可读。这样，会导致协程版的实现比串行版的实现耗费多达 `3` 倍的 `CPU` 时间。

为了避免这样的情况，可以使用 `LuaSocket` 中的函数 `select` ，该函数允许程序阻塞直到一组套接字的状态发生改变。要实现这种改动，只需要修改调度器即可，如下所示：

```lua
function dispatch ()
  local i = 1
  local timeout = {}
  while true do
    if tasks[i] == nil then
      if tasks[1] == nil then
        break
      end
      i = 1
      timeout = {}
    end
    local res = tasks[i]()
    if not res then
      table.remove(tasks, i)
    else
      i = i + 1
      timeout[#timeout + 1] = res
      if #timeout == #tasks then
        socket.select(timeout)
      end
    end
  end
end
```

在循环中，新的调度器将所有超时的连接收集到表 `timeout` 中。请记住，函数 `receive` 将这种超时的连接传递给 `yield` ，然后由 `resume` 返回。如果所有的连接均超时，那么调度器调用 `select` 等待这些连接的状态就会发生改变。这个最终的实现与上一个使用协程的实现一样快。另外，由于它不会有忙等待，所以串行实现耗费的 `CPU` 资源一样多。
