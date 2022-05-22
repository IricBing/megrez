# Ubuntu 20.04 编译

> [!tip]
> 参考文章：[中文wiki](https://github.com/quickjs-zh/QuickJS/wiki/%E5%9C%A8Linux%E4%B8%8B%E7%BC%96%E8%AF%91QuickJS)

## 环境准备

```bash
$ sudo apt install build-essential gcc-multilib
```

## Step1. 下载源码

> [!tip|label: 提示]
> 源码的最新地址请转至大神的[个人网站](https://bellard.org/quickjs/)中查看。

```bash
$ wget https://bellard.org/quickjs/quickjs-2021-03-27.tar.xz && tar -xvf quickjs-2021-03-27.tar.xz && cd quickjs-2021-03-27
```

## Step2. 编译

```bash
$ make -j12
```

## Step3. 测试

```bash
$ ./qjs --help
QuickJS version 2021-03-27
usage: qjs [options] [file [args]]
-h  --help         list options
-e  --eval EXPR    evaluate EXPR
-i  --interactive  go to interactive mode
-m  --module       load as ES6 module (default=autodetect)
    --script       load as ES6 script (default=autodetect)
-I  --include file include an additional file
    --std          make 'std' and 'os' available to the loaded script
    --bignum       enable the bignum extensions (BigFloat, BigDecimal)
    --qjscalc      load the QJSCalc runtime (default if invoked as qjscalc)
-T  --trace        trace memory allocation
-d  --dump         dump the memory usage stats
    --memory-limit n       limit the memory usage to 'n' bytes
    --stack-size n         limit the stack size to 'n' bytes
    --unhandled-rejection  dump unhandled promise rejections
-q  --quit         just instantiate the interpreter and quit
```

## 附录

### 安装

```bash
$ sudo make install
```

安装之后就能全局使用 `qjs` 、 `qjsc` 等命令了。
