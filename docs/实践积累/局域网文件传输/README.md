# 局域网文件传输

## http方式

以 `HTTP` 方式启动一个文件服务器，在局域网其他电脑上能够通过 `web` 访问并下载。采用最简单的方式—— `Python` 一行代码启动，如下所示：

```bash
$ python -m http.server 8081
```

当前目录下的文件就暴露出去了。
