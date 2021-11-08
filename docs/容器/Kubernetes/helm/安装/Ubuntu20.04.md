# Ubuntu 20.04 安装

## Snap方式——推荐

```shell
$ sudo snap install helm --classic
```

## 二进制文件安装

在 `GitHub` 仓库的[Release](https://github.com/helm/helm/releases)页面下载相应的二进制文件，下载下来是一个形如 `helm-vX.X.X-amd64.tar.gz` 命名风格的压缩文件。

之后解压文件，在解压目录中找到 `helm` 程序，移动到系统路径中即可，如下所示：

```shell
$ sudo mv linux-amd64/helm /usr/local/bin/helm
```
