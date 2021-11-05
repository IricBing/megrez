# table抖动

## 现象

![效果](assets/videos/效果.gif)

## 产生原因

详见[issue](https://github.com/ElemeFE/element/issues/16167)，目前只知道大概是因为 `table` 渲染的时候宽度到了临界值。

## 解决方案

### 修改table样式

给 `table` 加个 `99.9%` 的 `width` 样式，但是根据issue显示，可能有的时候还是会抖动。
