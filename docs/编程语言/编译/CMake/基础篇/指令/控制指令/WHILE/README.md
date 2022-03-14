# WHILE

## 语法

```cmake
while(<condition>)
  <commands>
endwhile()
```

`while` 和匹配之间的所有命令 `endwhile()` 被记录而不被调用。 一旦 `endwhile()` 如果被评估，则只要为 `<condition>` 真，就会调用记录的命令列表。
