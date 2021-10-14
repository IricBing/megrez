# 从rtsp视频流中截取图片

```shell
# 从rtsp视频流中获取一张图片
$ ffmpeg -rtsp_transport tcp -i "rtsp://admin:5tgb6tfc%^@192.168.3.64:554/h264/ch1/main/av_stream" -f image2 -frames:v 1 img.jpg

# 每秒截取一张，并按照img001.jpg、img002.jpg、img003.jpg这样的格式来命名。
$ ffmpeg -i "rtsp://admin:5tgb6tfc%^@192.168.3.64:554/h264/ch1/main/av_stream" -y -f image2 -r 1/1 img%03d.jpg

# 每秒截取一张，并覆盖到img.jpg上，保持img.jpg每秒更新
$ ffmpeg -i "rtsp://admin:5tgb6tfc%^@192.168.3.64:554/h264/ch1/main/av_stream" -y -f image2 -r 1/1 -updatefirst 1 img.jpg

# 每秒截取一张640x480分辨率的图片，并覆盖到img.jpg上，保持img.jpg每秒更新
$ ffmpeg -i "rtsp://admin:5tgb6tfc%^@192.168.3.64:554/h264/ch1/main/av_stream" -y -f image2 -r 1/1 -updatefirst 1 -s 640x480 img.jpg
```

::: tip 提示
上述命令是在命令行的情况下运行的，如果我们通过代码执行，会有**交互**，一般是问我们是否覆盖输出的文件，这时，在执行命令的时候在 `ffmpeg` 后面加上一个 `-y` 参数即可，如下所示：

```shell
$ ffmpeg -y -rtsp_transport tcp -i ……
```

:::
