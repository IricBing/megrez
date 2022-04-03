# Ubuntu 20.04 安装 Docker Compose

参考网址：[官方文档](https://docs.docker.com/compose/install/) `必看！`

## Step1. 下载二进制文件

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> [!warning|label:注意]
> 有可能下载不下来，被墙……


如果下载不下来，自己去[GitHub](https://github.com/docker/compose/releases)中自行下载最新版二进制文件，之后复制到 `/usr/local/bin/` 目录下即可。

> [!tip|label:提示]
> 要注意命令中的**版本号**


## Step2. 赋予可执行权限

```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```

## Step3. 安装zsh自动补全功能

```bash
$ gedit ~/.zshrc
```

插件列表增加插件 `docker-compose` 即可

## 卸载方式

删掉二进制文件即可

```bash
$ sudo rm /usr/local/bin/docker-compose
```
