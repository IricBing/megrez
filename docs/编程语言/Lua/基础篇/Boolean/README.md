# Boolean（布尔）

`Boolean` 类型具有两个值， `true` 和 `false` ，他们分别代表了**传统布尔值**。不过，在 `Lua` 语言中， `Boolean` 值并非是用于条件测试的唯一方式，**任何值都可以表示条件**。

在 `Lua` 语言中，条件测试（例如控制结构中的分支语句）将除 `Boolean` 值 `false` 和 `nil` 外的所有其他值视为真。特别的是，在条件测试中 `Lua` 语言把 `零` 和 `空字符串` 也都视为真。
