# 显示图片

示例代码：

```py
from PIL import Image
from matplotlib import pyplot as plt

# 这两行代码使得 pyplot 画出的图形中可以显示中文
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

plt.imshow(Image.open('demo.jpeg'))
plt.axis('off')
plt.title('图片')
plt.show()
```
