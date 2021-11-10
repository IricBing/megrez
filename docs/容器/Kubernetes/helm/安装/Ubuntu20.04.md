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

## 终端优化

### zsh

临时生效：

```shell
$ source <(helm completion zsh)
```

永久生效：

```shell
helm completion zsh > "${fpath[1]}/_helm"
```

::: details 永久有效的实现原理
一般而言，我们都是通过修改 `~/.zshrc` 文件，在这个里面加入相应的配置来实现，但是这里不是的，是写入了一个文件中，它的做法是在 `fpath` 数组**第一个元素**路径下新建一个 `_helm` 文件，之后往这里面写东西，下一次终端启动时，就会连带着把 `_helm` 文件也加载进来了。我们可以通过 `echo` 来查看具体写到了哪里：

```shell
$ echo ${fpath[1]}
/home/ubuntu/.oh-my-zsh/plugins/docker-compose
```

由此，我们知道了他写到了 `oh my zsh` 的 `docker-compose` 插件目录下面了。
:::
