# do while 循环

`do while` 循环是[while循环](./while循环.md)的另一个版本，唯一的区别是它**至少会执行一次**。

具体的语法形式如下：

```csharp
do
{
  语句块；
}while(布尔表达式);
```

`do while` 语句执行的过程是，先执行 `do{}` 中语句块的内容，再判断 `while()` 中布尔表达式的值是否为 `True` , 如果为 `True` , 则继续执行**语句块**中的内容，否则不执行，因此 `do while` 语句中的**语句块至少会执行一次**。

```flow
st=>start: 循环开始
cond=>condition: 布尔表达式?
process=>operation: 语句块
e=>end: 循环结束

st->process->cond(no)->e
cond(yes)->process->cond
```