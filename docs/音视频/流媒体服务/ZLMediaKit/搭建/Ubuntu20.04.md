# Ubuntu20.04搭建

## 获取源码

```bash
$ git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
$ cd ZLMediaKit
$ git submodule update --init
```

## 安装编译环境

```bash
$ sudo apt install build-essential cmake openssl ffmpeg libssl-dev libsdl-dev libavcodec-dev libavutil-dev
```

## 构建和编译

```bash
$ cd ZLMediaKit
$ mkdir build
$ cd build
$ cmake ..
$ make -j12
```

## 启动测试

```bash
$ cd ZLMediaKit/release/linux/Debug
#通过-h可以了解启动参数
$ ./MediaServer -h
# 启动测试
$ sudo ./MediaServer
2021-10-19 15:08:36.528 I MediaServer[115881-main thread] System.cpp:130 systemSetup | core文件大小设置为:18446744073709551615
2021-10-19 15:08:36.528 I MediaServer[115881-main thread] System.cpp:139 systemSetup | 文件最大描述符个数设置为:1048576
2021-10-19 15:08:36.529 W MediaServer[115881-main thread] SSLUtil.cpp:98 loadPublicKey | error:02001002:system library:fopen:No such file or directory
2021-10-19 15:08:36.529 W MediaServer[115881-main thread] SSLUtil.cpp:126 loadPrivateKey | error:2006D080:BIO routines:BIO_new_file:no such file
2021-10-19 15:08:36.530 D MediaServer[115881-stamp thread] util.cpp:342 operator() | Stamp thread started!
2021-10-19 15:08:36.530 I MediaServer[115881-main thread] EventPoller.cpp:466 EventPollerPool | 创建EventPoller个数:12
2021-10-19 15:08:36.530 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:554
2021-10-19 15:08:36.531 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:332
2021-10-19 15:08:36.531 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:1935
2021-10-19 15:08:36.531 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:19350
2021-10-19 15:08:36.531 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:80
2021-10-19 15:08:36.531 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:443
2021-10-19 15:08:36.532 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:9000
2021-10-19 15:08:36.532 I MediaServer[115881-main thread] TcpServer.cpp:188 start_l | TCP Server listening on 0.0.0.0:10000
2021-10-19 15:08:36.532 I MediaServer[115881-main thread] UdpServer.cpp:78 start_l | UDP Server bind to 0.0.0.0:10000
2021-10-19 15:08:36.532 I MediaServer[115881-main thread] main.cpp:329 start_main | 已启动http api 接口
2021-10-19 15:08:36.532 I MediaServer[115881-main thread] main.cpp:331 start_main | 已启动http hook 接口
```

::: tip 提示
这个程序需要占用 `554` 和 `80` 端口，因此需要 `sudo` 权限运行，一般 `80` 端口都会被 `nginx` 占用，注意先关闭 `nginx` ，关闭命令： `$ sudo systemctl stop nginx` 。
:::

## 服务方式运行

```bash
$ sudo ./MediaServer -d &
```
