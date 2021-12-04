# Ubuntu 20.04 安装 emsdk

从[官方GitHub仓库](https://github.com/emscripten-core/emsdk)上 `clone` 下来项目， `cd` 到项目目录，执行如下命令

```bash
$ ./emsdk install latest
$ ./emsdk activate latest
```

之后按照输出进行执行即可，示例输出如下：

```bash
$ ./emsdk activate latest
Resolving SDK alias 'latest' to '2.0.30'
Resolving SDK version '2.0.30' to 'sdk-releases-upstream-c69458f1bbf3ef5b8da4e934de210659cc9bca04-64bit'
Setting the following tools as active:
   node-14.15.5-64bit
   releases-upstream-c69458f1bbf3ef5b8da4e934de210659cc9bca04-64bit

Next steps:
- To conveniently access emsdk tools from the command line,
  consider adding the following directories to your PATH:
    /home/iric/software/emsdk
    /home/iric/software/emsdk/node/14.15.5_64bit/bin
    /home/iric/software/emsdk/upstream/emscripten
- This can be done for the current shell by running:
    source "/home/iric/software/emsdk/emsdk_env.sh"
- Configure emsdk in your shell startup scripts by running:
    echo 'source "/home/iric/software/emsdk/emsdk_env.sh"' >> $HOME/.zprofile
```

按照这个示例输出，我们要执行的就是两个命令：

```bash
$ source "/home/iric/software/emsdk/emsdk_env.sh" 
$ echo 'source "/home/iric/software/emsdk/emsdk_env.sh"' >> $HOME/.zprofile
```

接下来**重启**计算机，终端才能识别 `emsdk` 命令。

> [!tip|label:提示]
> 如果不嫌麻烦，可以每次想要使用 `emsdk` 命令之前，都执行一下 `$ source "/home/iric/software/emsdk/emsdk_env.sh" ` 命令。

