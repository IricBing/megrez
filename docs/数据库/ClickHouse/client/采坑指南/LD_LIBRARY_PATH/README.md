# LD_LIBRARY_PATH It can compromise security

## 产生场景

`Ubuntu 20.04` 环境通过 `apt` 安装的 `clickhouse-client` ，详见笔记：[Ubuntu20.04安装](../../安装/Ubuntu20.04安装.md)

在安装完成后终端上输入 `clickhouse-client` 出现如下错误：

```bash
$ clickhouse-client
Environment variable LD_LIBRARY_PATH is set to /home/iric/.gvm/pkgsets/go1.17.5/global/overlay/lib:. It can compromise security.
```

意思是 `LD_LIBRARY_PATH` **可能会涉及危害**。

## 产生原因

目前还不太懂具体原理，先放一篇网上文章：https://askubuntu.com/questions/801570/is-ld-library-path-a-security-risk

## 解决办法

### 使用sudo

```bash
$ sudo clickhouse-client -V
ClickHouse client version 22.4.2.1 (official build).
```
