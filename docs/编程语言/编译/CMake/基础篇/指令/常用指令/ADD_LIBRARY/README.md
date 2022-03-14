# ADD_LIBRARY

## 语法

```cmake
ADD_LIBRARY(<name> [STATIC | SHARED | MODULE] [source1] [source2 ...])
```

`STATIC` 、 `SHARED` 或者 `MODULE` 可以指定要创建的库的**类型**。 `STATIC` 库是链接其他目标时使用的目标文件的存档。 `SHARED` 库是**动态链接**的，并在运行时加载

## 作用

根据源码文件生成目标库。
