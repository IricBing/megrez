# Ubuntu 20.04 安装

## apt安装

> [!tip|label: 提示]
> 如果 `Lua` 也是使用 `apt` 的方式安装的，推荐使用这种方式；如果 `Lua` 也是源码，多版本安装的，推荐使用下面的源码安装方式。

`luarocks` 已经添加到 `apt` 源中了，可以直接通过 `apt` 命令安装。

```bash
$ sudo apt install luarocks 
```

## 源码安装

[源码下载地址](https://luarocks.github.io/luarocks/releases/)

```bash
$ wget https://luarocks.org/releases/luarocks-3.9.0.tar.gz

$ tar zxpf luarocks-3.9.0.tar.gz

$ cd luarocks-3.9.0

$ ./configure --lua-version=5.1
$ sudo make bootstrap
```

> [!tip|label: 提示]
> 由于我是在 `Ubuntu 20.04` 系统，并且在安装 `Lua` 的时候是使用了多版本共存的方式安装的，会有问题，首先搞一个默认安装，之后再搞多版本共存，因为在 `./configure` 的时候会检查 `/usr/local/include/lua.h` 文件，如果没有先默认安装，直接用软连接的方式，这个是不存在的。
