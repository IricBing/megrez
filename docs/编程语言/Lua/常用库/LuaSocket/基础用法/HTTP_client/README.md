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
