# 裁剪图片

```py
from cv2 import cv2

if __name__ == '__main__':
    try:
        image = cv2.imread('./avatar.jpg')
        print(type(image.shape))
        width, height = image.shape
        start_x = int(width / 2 - 164)
        end_x = int(width / 2 + 164)
        start_y = int(height / 2 - 164)
        end_y = int(height / 2 + 164)
        cropImg = image[start_x:end_x, start_y:end_y]
        cv2.imwrite('./out.jpg', cropImg)
    except KeyboardInterrupt:
        pass
```

原始图片(**avatar.jpg**):

![avatar](assets/images/avatar.jpg)

输出图片(**out.jpg**)：

![out](assets/images/out.jpg)
