# SSH 登录配置

> [!tip|label: 提示]
> 开启防火墙`22`号端口。

## 修改ssh配置文件

修改`/etc/ssh/sshd_config`配置文件。

```bash
$ sudo vim /etc/ssh/sshd_config
```

将 `PubkeyAuthentication` 字段的注释打开，并设置为 `no` ，新增 `PasswordAuthentication yes` 配置，如下所示：

```bash
#MaxSessions 10

PubkeyAuthentication no
PasswordAuthentication yes

# Expect .ssh/authorized_keys2 to be disregarded by default in future.
#AuthorizedKeysFile     .ssh/authorized_keys .ssh/authorized_keys2
```

重启`ssh`服务，并设置`ssh`服务**开机自启动**。

```bash
$ sudo service restart ssh
$ sudo systemctl enable ssh
```