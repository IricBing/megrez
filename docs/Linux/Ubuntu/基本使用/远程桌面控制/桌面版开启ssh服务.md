# 桌面版开启ssh服务

## 场景

桌面版 `Linux` 操作系统默认是不带有 `ssh` 后台服务的，但是有的时候我们想要通过 `ssh` 登录到桌面版操作系统中。

## 解决办法

```bash
$ sudo apt install openssh-server
$ sudo ufw allow 22
```
