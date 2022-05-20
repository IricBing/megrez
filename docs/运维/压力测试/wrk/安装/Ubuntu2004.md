# Ubuntu 20.04 安装

> [!tip|label: 提示]
> `wrk` 仅支持源码编译**二进制可执行文件**。

## Step1. 下载源码

```bash
$ git clone https://github.com/wg/wrk.git
```

> [!tip]
> 这个仓库体积挺大，注意 `clone` 速度。

## Step2. 编译

```bash
$ make -j12
```

## Step3. 检验

经过上述的 `make` 命令已经编译好了 `wrk` 二进制可执行文件，它没有写安装命令，因此如果想安装可以指定 `path` ，一般的情况下直接运行二进制文件即可。

```bash
$ ./wrk -t4 -c400 -d10s https://www.baidu.com
```

## Step4. 安装

由于它已经编译好了可执行二进制文件，我们只需要把它写入环境变量或者拷贝到可执行文件的通用目录即可：

```bash
$ sudo cp ./wrk /usr/local/bin
Running 10s test @ https://www.baidu.com
  4 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   451.55ms  331.01ms   1.98s    85.64%
    Req/Sec   212.90     64.97   424.00     69.74%
  8072 requests in 10.09s, 81.20MB read
  Socket errors: connect 0, read 0, write 0, timeout 81
Requests/sec:    800.04
Transfer/sec:      8.05MB
```

再来检查一下：

```bash
$ wrk -t4 -c400 -d10s https://www.baidu.com
```
