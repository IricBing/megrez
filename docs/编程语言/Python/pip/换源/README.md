# 换源

> [!warning]
> 不知道为什么，这么多次尝试下来，不管是 `Windows` 还是 `Linux` ，我使用清华源都是有问题的，建议使用阿里源。

## 临时使用

```shell
$ pip install scrapy -i http://mirrors.aliyun.com/pypi/simple/ 
```

## 永久修改-命令版

```shell
$ pip config set global.index-url http://mirrors.aliyun.com/pypi/simple/ 
$ pip config set global.trusted-host mirrors.aliyun.com
```

## 永久修改-配置文件

### Linux

修改 `~/.pip/pip.conf` (没有就创建一个)， 内容如下：

```ini
[global]
timeout = 6000
index-url = http://mirrors.aliyun.com/pypi/simple/ 
trusted-host = mirrors.aliyun.com
```

### Windows

`win+R` 打开用户目录 `%HOMEPATH%` ，在此目录下创建 `pip` 文件夹，在 `pip` 目录下创建 `pip.ini` 文件, 内容如下:

```ini
[global]
timeout = 6000
index-url = http://mirrors.aliyun.com/pypi/simple/ 
trusted-host = mirrors.aliyun.com
```
