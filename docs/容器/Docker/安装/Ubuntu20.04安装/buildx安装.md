# buildx 安装
* [官方文档](https://docs.docker.com/buildx/working-with-buildx/)

## 安装

> [!tip|label: 提示]
> 安装的原理就是下载二进制文件到指定的目录，并赋予可执行权限。

首先去[GitHub Release](https://github.com/docker/buildx/releases)上找最新的二进制文件

```bash
$ mkdir ~/.docker/cli-plugins
$ wget https://github.com/docker/buildx/releases/download/v0.8.2/buildx-v0.8.2.linux-amd64
$ mv buildx-v0.8.2.linux-amd64 docker-buildx
$ chmod +x ~/.docker/cli-plugins/docker-buildx
```

## 验证

```bash
$ docker buildx ls
NAME/NODE DRIVER/ENDPOINT STATUS  PLATFORMS
default * docker                  
  default default         running linux/amd64, linux/386
```

## 附录

### 设置为默认

按照上述的方式使用 `buildx` 需要在每次构建的时候都要多输入 `buildx` 指令，可以将 `$ docker build` 默认设置为 `$ docker buildx build`

```bash
$ docker buildx install
```

取消默认配置也很简单：

```bash
$ docker buildx uninstall
```
