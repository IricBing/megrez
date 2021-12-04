# Registry Config

## 前言

尽管我们使用 `nrm` ， `yrm` 等换源工具将 `registry` 指向了 `taobao` 镜像源，但是在下载一些二进制包的时候还是会遇到网络问题。

解决办法是：在项目的**根目录**配置 `.npmrc` （使用npm） 或 `.yarnrc` （使用yarn） 文件，指定二进制包地址。

## .npmrc 文件完整版配置

```bash
home="https://npmmirror.com"
registry="https://registry.npmmirror.com/"

#前台相关
sass_binary_site="https://npmmirror.com/mirrors/node-sass/"
canvas_binary_host_mirror="https://npmmirror.com/mirrors/node-canvas-prebuilt/"
phantomjs_cdnurl="https://npmmirror.com/dist/phantomjs/"
electron_mirror="https://npmmirror.com/mirrors/electron/"
sqlite3_binary_host_mirror="http://npmmirror.com/mirrors/"
profiler_binary_host_mirror="https://npmmirror.com/mirrors/node-inspector/"
chromedriver_cdnurl="http://npmmirror.com/mirrors/chromedriver/"
operadriver_cdnurl="http://npmmirror.com/mirrors/operadriver/"
electron_builder_binaries_mirror="http://npmmirror.com/mirrors/electron-builder-binaries/"

#后台相关
grpc_node_binary_host_mirror="https://npmmirror.com/mirrors/"
node_sqlite3_binary_host_mirror="http://npmmirror.com/mirrors/"
nodejieba_binary_host_mirror="https://npmmirror.com/mirrors/nodejieba"
```

## .yarnrc 文件完整版配置

```bash
home "https://npmmirror.com"
registry "https://registry.npmmirror.com/"
disturl "https://npmmirror.com/dist"

#前台相关
sass_binary_site "https://npmmirror.com/mirrors/node-sass/"
canvas_binary_host_mirror "https://npmmirror.com/mirrors/node-canvas-prebuilt/"
phantomjs_cdnurl "https://npmmirror.com/dist/phantomjs/"
electron_mirror "https://npmmirror.com/mirrors/electron/"
sqlite3_binary_host_mirror "http://npmmirror.com/mirrors/"
profiler_binary_host_mirror "https://npmmirror.com/mirrors/node-inspector/"
chromedriver_cdnurl "http://npmmirror.com/mirrors/chromedriver/"
operadriver_cdnurl "http://npmmirror.com/mirrors/operadriver/"
electron_builder_binaries_mirror "http://npmmirror.com/mirrors/electron-builder-binaries/"

#后台相关
grpc_node_binary_host_mirror "https://npmmirror.com/mirrors/"
node_sqlite3_binary_host_mirror "http://npmmirror.com/mirrors/"
nodejieba_binary_host_mirror "https://npmmirror.com/mirrors/nodejieba"
```
