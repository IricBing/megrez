# FOREACH

## 语法

```cmake
foreach(<loop_var> <items>)
  <commands>
endforeach()
```

其中 `<items>` 是以**分号**或**空格**分隔的项目列表。记录 `foreach` 匹配和匹配之间的所有命令 `endforeach` 而不调用。 一旦 `endforeach` 评估，命令的记录列表中的每个项目调用一次 `<items>` 。在每次迭代开始时，变量 `loop_var` 将设置为**当前项**的值。
