# Ubuntu 20.04 TFTP服务器搭建

## 安装软件

```bash
# 安装服务端
$ sudo apt install tftpd-hpa

# 安装客户端
$ sudo apt install tftp-hpa
```

## 配置

编辑 `/etc/default/tftpd-hpa` 文件，将文件改成如下信息

```conf
# /etc/default/tftpd-hpa

TFTP_USERNAME="tftp"
TFTP_DIRECTORY="/home/iric/tftp"    # tftp服务目录
TFTP_ADDRESS=":69"                  # tftp服务监听端口
TFTP_OPTIONS="-l -c -s"
```

## 重载

```bash
# 重启服务
$ sudo service tftpd-hpa restart 

# 查看服务运行状态
$ sudo service tftpd-hpa status 
```

## 测试

在 `tftp` 服务监听的文件夹下放置一个测试文件，例如： `123.txt` ，之后输入进入 `tftp` 命令：

```bash
$ tftp 127.0.0.1
> tftp get 123.txt
> tftp q
```

> [!tip|label: 提示]
> 可能遇到 `tftp` 文件夹权限问题，使用 `$ sudo chmod 777 dir` 命令开放文件夹权限，并注意非本机访问要开放 `69` 号端口。
