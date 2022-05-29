# 换源

> [!warning|label: 注意]
> `armbian` 的源实际上 `和ubuntu` 没有太大区别，但是国内有的源里缺少很多东西，尤其是阿里华为这种源， `arm` 架构的却少了很多，谨慎换源！！
>  
> **建议不要换源**，默认的走的 `ubuntu` 官网，还可以接受，据说是和运营商有关，我的宽带是电信的，速度能达到 `1m` ，可以接受了。

## 方法一

* [参考文章](https://www.cnblogs.com/soclear/p/14812099.html)

## 方法二

### Step1. 备份默认配置

```bash
$ sudo mv /etc/apt/sources.list /etc/apt/sources.list.bak
```

### Step2. 写入新配置

```bash
$ sudo vim /etc/apt/sources.list
```

写入如下内容：

```apache-conf
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse

```

更新

```bash
$ sudo apt update
```

> [!warning|label: 注意]
> 这方方式在我这里经常报 `404` ，所以放弃换源了。
