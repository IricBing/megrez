# TCP server

基础示例：

```lua
local socket = require("socket")
local server = assert(socket.bind("*", 3000))
local tcp = assert(socket.tcp())

print(socket._VERSION)
print(tcp)

while 1 do
  local client = server:accept()

  line = client:receive()
  client:send("it works\n")
end
```
