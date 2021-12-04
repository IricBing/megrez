# Pillow(PIL)

在 `Python2` 中， `PIL` (**Python Imaging Library**)是一个非常好用的图像处理库，但 `PIL` 不支持 `Python3` ，所以有人(Alex Clark和Contributors)提供了 `Pillow` ，可以在 `Python3` 中使用。

## 安装

```bash
$ pip install pillow
```

## 使用

`Pillow` 库安装成功后，导包时要用 `PIL` 来导入，而不能用 `pillow` 或 `Pillow` 。

```py
import PIL
from PIL import Image
```

在 `Pillow` 库中，除了有二十多个模块，还支持非常多的插件。其中最常用的是 `Image` 模块中同名的 `Image` 类，其他很多模块都是在 `Image` 模块的基础上对图像做进一步的特殊处理， `Image` 模块中会导入部分来使用。
