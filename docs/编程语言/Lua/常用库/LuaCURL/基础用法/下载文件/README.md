# 下载文件

参考网友博客：https://www.bbsmax.com/A/mo5kyGKMzw/

```lua
curl = require("luacurl")
require("md5")
-- 下载图片
function get_img(url, c)
    local result = {}
    if c == nil then
        c = curl.new()
    end
    c:setopt(curl.OPT_URL, url)
    c:setopt(curl.OPT_WRITEDATA, result)
    c:setopt(curl.OPT_WRITEFUNCTION, function(tab, buffer)
        table.insert(tab, buffer)
        return #buffer
    end)
    local ok = c:perform()
    return ok, table.concat(result)
end
-- 图片url
downloadurl = "http://192.168.75.60:8090/FlexerDesigner/js/easyui134/themes/icons/filesave.png"
-- 函数调用
ok, fileByte = get_img(downloadurl)
-- 看是否执行成功
print(ok)
-- md5转码
md5 = md5.sumhexa(fileByte)
print(md5)
--[[
-- 保存图片
file = io.open("filesave.png", "w")
if(file) then
　　file:write(fileByte);
　　file:close();
end
  
]]
```

这种写法是将远端文件的内容全部加载到 `Lua` 变量中（ `fileByte` 变量），这种方式在资源有限的嵌入式场景不够优雅，在嵌入式场景中尽量使用**流**的方式来下载，改版示例：

```lua
local curl = require("luacurl")
local curlClient = curl.new()
local file = io.open("/tmp/firmware.jx", "wb+")
curlClient:setopt(curl.OPT_URL, url)
curlClient:setopt(curl.OPT_WRITEFUNCTION, function(_, buffer)
    file:write(buffer)
    return #buffer
end)
curlClient:perform()
file:close()
```
