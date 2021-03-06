# Ubuntu20.04安装

`gvm` 的[github地址](https://github.com/moovweb/gvm)

## 自动化脚本安装

```bash
$ sudo apt-get install curl git mercurial make binutils bison gcc build-essential

$ zsh < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
Cloning from https://github.com/moovweb/gvm.git to /home/iric/.gvm
No existing Go versions detected
Installed GVM v1.0.22

Please restart your terminal session or to get started right away run
 `source /home/iric/.gvm/scripts/gvm`
```

> [!tip|label: 提示]
> 我是 `zsh` 终端，所以命令是以 `zsh` 开头的，官方文档上是 `bash` 开头的，如果按照官方文档安装，关闭终端后 `gvm` 命令并不在环境变量里面!

注意输出，需要将输出中的命令拷贝并执行

```bash
$ source /home/iric/.gvm/scripts/gvm
```

## 编辑环境配置文件

编辑 `~/.zshrc` 或者 `~/.bashrc` 文件，在文件末尾追加 `GO_BINARY_BASE_URL` 环境变量

```bash
# gvm 配置
export GO_SOURCE_URL="https://mirrors.ustc.edu.cn/golang"
export GO_BINARY_BASE_URL="https://mirrors.ustc.edu.cn/golang"
```

## 安装 `go` (1.5+)

```bash
$ gvm install go1.4 -B
$ gvm use go1.4
$ export GOROOT_BOOTSTRAP=$GOROOT
$ gvm install go1.16
$ gvm use go1.16 --default

# 安装完成，验证
$ go version
go version go1.16 linux/amd64
```

## 配置代理

生在天朝，你懂得

```bash
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```
