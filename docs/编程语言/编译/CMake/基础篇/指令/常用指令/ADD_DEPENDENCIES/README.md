# ADD_DEPENDENCIES

## 语法

```cmake
ADD_DEPENDENCIES(target-name depend-target1 depend-target2 ...)
```

## 作用

定义 `target` 依赖的其他 `target` ， 确保在编译本 `target` 之前, 其他的 `target` 已经被构建。
