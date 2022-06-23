# Ubuntu 20.04 编译

## 环境准备

```bash
$ sudo apt update && sudo apt install cmake libssl-dev libcurl4-openssl-dev
```

## Step1. 下载源码

```bash
$ git clone --recursive https://github.com/saghul/txiki.js --shallow-submodules && cd txiki.js
```

> [!tip|label: 提示]
> 从github下载，注意网速。

## Step2. 编译

```bash
$ make
```

## Step3. 验证

运行 `REPL` （交互解释器）

```bash
$ ./build/tjs
```

## 采坑

### Could NOT find CURL (missing: CURL_LIBRARY CURL_INCLUDE_DIR)

`make` 编译的时候遇到 `Could NOT find CURL (missing: CURL_LIBRARY CURL_INCLUDE_DIR)` 错误，这是因为没有安装 `curl` 的开发环境，运行如下命令安装环境：

```bash
$ sudo apt install curl libcurl4-openssl-dev
```
