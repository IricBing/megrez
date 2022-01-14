# String.prototype.replaceAll

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

> [!tip]
> 这个语法糖在实际工作中非常有用！

## 语法

```js
const newStr = str.replaceAll(regexp | substr, newSubstr | function)
```

> [!warning]
> 当使用一个 `regex` 时，您必须设置**全局**（ `“g”` ）标志，否则，它将引发 `TypeError` ：“必须使用全局 `RegExp` 调用 `replaceAll` ”。

`replaceAll()` 方法返回一个**新字符串**，新字符串所有满足 `pattern` 的部分都已被 `replacement` 替换。 `pattern` 可以是一个**字符串**或一个 `RegExp` ， `replacement` 可以是一个**字符串**或一个在每次匹配被调用的**函数**。

> [!warning]
> 原始字符串保持不变。

### 参数

### 返回值

一个新的字符串。
