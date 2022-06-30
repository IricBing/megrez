# 进制转换

> [!tip|label: 提示]
> 本笔记的处理方式与网络上找到的有一定的差别，主要是字符串拼接的部分使用了[字符串缓冲区](../../../基础篇/数据结构/字符串缓冲区/README.md)相关的优化，而互联网上的大部分参考都是使用了常规的字符串拼接符—— `..`

## 场景与需求

由于我们的 `Lua` 一般使用在嵌入式场景，很多时候会遇到**十六进制**、**二进制**的数据处理。虽然 `Lua` 自带的字符串功能十分强大，但是处理十六进制的时候还是需要我们做一些工作的，本笔记记录下来这些常用的处理方法。

## 普通字符串十六进制显示

```lua
--- 字符串转为十六进制显示
--- @param str string 原始字符串
--- @param separator string | nil 分隔符
--- @return string 十六进制显示字符串
function string.toHex(str, separator)
    if (type(str) ~= "string") then return nil, "string.toHex invalid params type" end

    local buffer = {}
    for index = 1, str:len() do
        table.insert(buffer, string.format("%02X", str:sub(index):byte()))
    end

    return table.concat(buffer, separator or "")
end
```

用法：

```lua
local str = "123f你好ds"
print(string.toHex("hello world"))  --> 68656C6C6F20776F726C64
print(string.toHex("str"))          --> 737472
print(string.toHex("str", ' '))     --> 73 74 72
print(str:toHex())                  --> 31323366E4BDA0E5A5BD6473
print(str:toHex('-'))               --> 31-32-33-66-E4-BD-A0-E5-A5-BD-64-73
```

## 十六进制字符串转标准字符串

> [!tip|label: 提示]
> 在 `Lua` 中，由于默认就是 `UTF-8` 格式的编码，因此这里省去了我们好多麻烦。  

```lua
--- 十六进制显示字符串转标准字符串
--- @param hex string 十六进制显示的字符串
--- @return string 标准字符串
function string.fromHex(hex)
    if (type(hex) ~= "string") then return nil, "string.fromHex invalid params type" end
    -- 滤掉分隔符
    hex = hex:gsub("[%s%p]", ""):upper()
    -- 检查内容是否合法
    if (hex:find("[^0-9A-Fa-f]") ~= nil) then
        return nil, "string.fromHex invalid params content"
    end
    -- 检查字符串长度
    if (hex:len() % 2 ~= 0) then return nil, "string.fromHex invalid params length" end
    -- 拼接字符串
    local buffer = {}
    for index = 1, hex:len(), 2 do
        table.insert(buffer, string.char(tonumber(hex:sub(index, index + 1), 16)))
    end

    return table.concat(buffer)
end
```

用法：

```lua
local str = "123f你好ds"
print(string.fromHex("31:32"))        --> 12
print(string.fromHex(str.toHex()))    --> 123f你好ds
print(string.fromHex(str.toHex("-"))) --> 123f你好ds
```

## 文件下载

<a href="编程语言/Lua/实践篇/字符串处理/进制转换/assets/files/string.lua" download="string.lua">string.lua</a>
