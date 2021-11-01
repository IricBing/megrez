# 中文支持

默认是不支持中文的，需要修改配置，在代码中加入如下内容即可：

```python
from matplotlib import pyplot as plt

# 这两行代码使得 pyplot 画出的图形中可以显示中文
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False
```

## Linux环境配置

上述方式采用的 `SimHei` 字体在 `Linux` 上默认是没有的，请参考笔记：[安装SimHei字体](../../../../../Linux/Ubuntu/20.04/系统配置/安装SimHei字体/README.md)

之后删除 `matplotlib` 的缓存

```shell
$ rm -r ~/.cache/matplotlib
```

如果还不行，将 `SimHei.ttf` 字体拷贝一份到 `matplotlib` 库的字体目录下，示例：

 `~/miniconda3/envs/python-demo/lib/python3.9/site-packages/matplotlib/mpl-data/fonts/ttf`
