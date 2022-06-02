# Apt-key deprecation (with workaround)

## 产生场景

```bash
$ sudo apt update
Hit:1 http://mirrors.sustech.edu.cn/armbian jammy InRelease
Hit:2 http://ports.ubuntu.com jammy InRelease
Hit:3 http://ports.ubuntu.com jammy-security InRelease
Hit:4 http://ports.ubuntu.com jammy-updates InRelease
Hit:5 http://ports.ubuntu.com jammy-backports InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.
W: http://apt.armbian.com/dists/jammy/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
```

## 产生原因

还不太懂，请参考：https://askubuntu.com/questions/1286545/what-commands-exactly-should-replace-the-deprecated-apt-key

## 解决办法

[参考文章](https://forums.insynchq.com/t/apt-key-deprecation-with-workaround/18100)

```bash
$ sudo mv /etc/apt/trusted.gpg /etc/apt/trusted.gpg.d/trusted.gpg
```