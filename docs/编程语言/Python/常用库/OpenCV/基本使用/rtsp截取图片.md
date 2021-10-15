# 从rtsp视频流中截取图片

示例代码：

```python
from cv2 import cv2

if __name__ == '__main__':
    try:
        cap = cv2.VideoCapture('rtsp://admin:5tgb6tfc%^@192.168.3.64')
        while True:
            ret, frame = cap.read()
            if not ret:
                continue
            cv2.imwrite('image.jpg', frame) #存储为图像
            break
        cap.release() #注意释放资源
    except KeyboardInterrupt:
        pass
```
