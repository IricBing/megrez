# while循环

`C#` 中 `while` 循环与 `for` 循环类似，但是 `while` 循环一般适用于**不固定次数**的循环。

`while` 循环的语法形式如下:

```csharp
while(布尔表达式)
{
  语句块;
}
```

`while` 语句执行的过程是，当 `while` 中布尔表达式的结果为 `True` 时，执行语句块中的内容，否则不执行。

```flow
st=>start: 循环开始
cond=>condition: 布尔表达式?
process=>operation: 表达式1
e=>end: 循环结束

st->cond(no)->e
cond(yes)->process->cond
```

> [!tip|label:提示]
> 通常使用 `for` 循环可以操作的语句都可以使用 `while` 循环完成。
