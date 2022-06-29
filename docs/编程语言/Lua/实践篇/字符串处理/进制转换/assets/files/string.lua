--- 字符串转为十六进制显示
--- @param str string 原始字符串
--- @param separator string | nil 分隔符
--- @return string 十六进制显示字符串
function string.toHex(str, separator)
    if (type(str) ~= "string") then return nil, "Invalid params type" end

    local buffer = {}
    for index = 1, str:len() do
        table.insert(buffer, string.format("%02X", str:sub(index):byte()))
    end

    return table.concat(buffer, separator or "")
end

--- 十六进制显示字符串转标准字符串
--- @param hex string 十六进制显示的字符串
--- @return string 标准字符串
function string.fromHex(hex)
    if (type(hex) ~= "string") then return nil, "Invalid params type" end
    -- 滤掉分隔符
    hex = hex:gsub("[%s%p]", ""):upper()
    -- 检查内容是否合法
    if (hex:find("[^0-9A-Fa-f]") ~= nil) then
        return nil, "Invalid params content"
    end
    -- 检查字符串长度
    if (hex:len() % 2 ~= 0) then return nil, "Invalid params length" end
    -- 拼接字符串
    local buffer = {}
    for index = 1, hex:len(), 2 do
        table.insert(buffer,
                     string.char(tonumber(hex:sub(index, index + 1), 16)))
    end

    return table.concat(buffer)
end
