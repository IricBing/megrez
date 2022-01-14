# Windows 安装

从官网下载页面下载即可：https://golang.google.cn/dl/

选择 `amd64.msi` 格式的安装包即可。

## 配置代理

生在天朝，你懂得

```bash
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```