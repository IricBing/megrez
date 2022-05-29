# GPG error The following signatures couldn't be verified

## 场景

章鱼星球新输入的armbian系统，换源为中科大源后，执行$sudo apt update后出现如下错误：

```bash
$ sudo apt update
W: GPG error: https://mirror.iscas.ac.cn/armbian jammy InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 93D6889F9F0E78D5
E: The repository 'http://apt.armbian.com jammy InRelease' is not signed
```

## 原因

## 解决办法

[参考文章](https://hellodk.cn/post/906)

```bash
$ gpg --keyserver keyserver.ubuntu.com --recv 93D6889F9F0E78D5
$ gpg --export --armor 93D6889F9F0E78D5 | sudo apt-key add -
```