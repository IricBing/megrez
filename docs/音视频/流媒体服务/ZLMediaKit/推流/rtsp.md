# rtsp推流

```shell
# h264推流
$ ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
# h265推流
$ ffmpeg -re -i "/path/to/test.mp4" -vcodec h265 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
```

::: tip 提示
如果需要循环推流，可以加上 `-stream_loop -1` 参数，如下所示：

```shell
$ ffmpeg -re -stream_loop -1 -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
```

:::

如果推流正常，在 `ZLMediaKit` 控制台能够看到如下输出：

```shell
2021-10-19 15:44:42.457 D MediaServer[115881-event poller 0] RtspSession.cpp:53 RtspSession | 140710175815248(127.0.0.1:57792) 
2021-10-19 15:44:42.457 I MediaServer[115881-event poller 0] MediaSource.cpp:414 emitEvent | 媒体注册:hls __defaultVhost__ live test
2021-10-19 15:44:42.457 D MediaServer[115881-event poller 0] MediaSink.cpp:158 emitAllTrackReady | all track ready use 0ms
2021-10-19 15:44:42.457 I MediaServer[115881-event poller 0] MultiMediaSourceMuxer.cpp:299 onAllTrackReady | stream: rtsp://127.0.0.1:554/live/test , codec info: H264[640/368/48] mpeg4-generic[48000/2/16] 
2021-10-19 15:44:45.710 I MediaServer[115881-event poller 0] MediaSource.cpp:414 emitEvent | 媒体注册:rtsp __defaultVhost__ live test
2021-10-19 15:44:45.711 I MediaServer[115881-event poller 0] MediaSource.cpp:414 emitEvent | 媒体注册:rtmp __defaultVhost__ live test
2021-10-19 15:44:45.711 I MediaServer[115881-event poller 0] MediaSource.cpp:414 emitEvent | 媒体注册:ts __defaultVhost__ live test
2021-10-19 15:44:45.789 I MediaServer[115881-event poller 0] MediaSource.cpp:414 emitEvent | 媒体注册:fmp4 __defaultVhost__ live test
```

按照官方文档规则：

```shell
2020-04-10 12:51:52.331 I | regist rtsp __defaultVhost__ rtp 206442D7
                                    ^           ^         ^      ^
                                  schema      vhost      app stream_id
```

可以看到此次推流直接注册了五条可拉取视频流，分别是： `hls` 、 `rtsp` 、 `rtmp` 、 `ts` 和 `fmp4` 。 `vhost` 为 `__defaultVhost__` ， `app` 为 `live` ， `stream_id` 为 `test` 。默认端口为： `554`

如果用 `VLC` 等流媒体播放器，只需要在**网络串流地址**处写： `rtsp://127.0.0.1:554/live/test` 即可。
