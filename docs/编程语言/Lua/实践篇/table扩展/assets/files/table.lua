--- 复制table
--- @param st table 原table
--- @return table 复制后的table
function table.copy(st)
  local tab = {}
  for k, v in pairs(st or {}) do
    if type(v) ~= "table" then
      tab[k] = v
    else
      tab[k] = table.copy(v)
    end
  end
  return tab
end

--- 模仿JS中的Object.assign用法
--- @param target table 原table
--- @param ... table[] 要合并的table列表
--- @return table 原table
function table.assign(target, ...)
  for _, source in ipairs {...} do
    for k, v in pairs(source) do
      if type(v) ~= "table" then
        target[k] = v
      else
        target[k] = table.copy(v)
      end
    end
  end
  return target
end

--- 合并并返回新的table
--- @description 返回信息和table.assign一致，但是不修改target参数
--- @param target table 原table
--- @param ... table[] 要合并的table列表
--- @return table 原table
function table.merge(target, ...)
  local tab = table.copy(target)
  for _, source in ipairs {...} do
    for k, v in pairs(source) do
      if type(v) ~= "table" then
        tab[k] = v
      else
        tab[k] = table.copy(v)
      end
    end
  end
  return tab
end

--- 检查table是否为空
--- @param t table 要检查的table
--- @return boolean 是否为空
function table.isEmpty(t)
    return next(table) == nil
end