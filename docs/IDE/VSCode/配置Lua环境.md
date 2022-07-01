# 配置Lua环境

## 必备插件

* lua（作者是sumneko）
* Lua Debug

## 项目配置

`.vscode/extensions.json` 文件配置：

```json
{
  "recommendations": [
    "sumneko.lua",
    "actboy168.lua-debug"
  ]
}
```

`.vscode/settings.json` 文件配置：

```json
{
    "[lua]": {
        "editor.defaultFormatter": "sumneko.lua",
    },
}
```

## 调试配置

在 `.vscode/launch.json` 文件中添加如下配置：

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lua",
      "request": "launch",
      "name": "Debug",
      "program": "${file}",
      "consoleCoding":"utf8"
    }
  ]
}
```

之后按 `F5` 快捷键就可以愉快的调试啦。
