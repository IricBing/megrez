# HTTP client

* [官方文档](https://w3.impa.br/~diego/software/luasocket/http.html)

基础示例：

```lua
-- load the http module
http = require("socket.http")

-- Requests information about a document, without downloading it.
-- Useful, for example, if you want to display a download gauge and need
-- to know the size of the document in advance
r, c, h = http.request {
  method = "HEAD",
  url = "http://www.tecgraf.puc-rio.br/~diego"
}
-- r is 1, c is 200, and h would return the following headers:
-- h = {
--   date = "Tue, 18 Sep 2001 20:42:21 GMT",
--   server = "Apache/1.3.12 (Unix)  (Red Hat/Linux)",
--   ["last-modified"] = "Wed, 05 Sep 2001 06:11:20 GMT",
--   ["content-length"] = 15652,
--   ["connection"] = "close",
--   ["content-Type"] = "text/html"
-- }
```

POST 请求：

```lua
#!/usr/bin/env lua
local http=require("socket.http");

local request_body = [[login=user&password=123]]
local response_body = {}

local client, code, response_headers = http.request{
  url = "http://httpbin.org/post",
  method = "POST",
  headers = {
    ["Content-Type"] = "application/x-www-form-urlencoded";
    ["Content-Length"] = #request_body;
  },
  source = ltn12.source.string(request_body),
  sink = ltn12.sink.table(response_body),
}

print(client)
print(code)

if type(response_headers) == "table" then
  for k, v in pairs(response_headers) do
    print(k, v)
  end
end

print("Response body:")
if type(response_body) == "table" then
  print(table.concat(response_body))
  -- local res = cjson.decode(table.concat(res))  -- 这样拿到返回JSON
else
  print("Not a table:", type(response_body))
end
```

## 下载文件

```lua
local body, code = http.request(url)
if not body then error(code) end

local f = assert(io.open('/tmp/firmware.jx', 'wb')) -- open in "binary" mode
f:write(body)
f:close()
```
