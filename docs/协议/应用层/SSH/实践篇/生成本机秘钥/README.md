# 生成本机秘钥

## Linux

> [!tip|label: 操作系统]
> Ubuntu 20.04 LTS

一般Linux都会自带ssh功能，因为毕竟它的连接是通过22端口，走的ssh协议通信的，所以没有特殊情况下，这个不需要单独安装。

```bash
$ ssh-keygen
```

## Windows

> [!tip|label: 操作系统]
> Windows 10

Windows一般默认不会有ssh功能，需要单独安装，我们直接安装git实际上就带有了这个功能。

```bash
$ ssh-keygen
```
