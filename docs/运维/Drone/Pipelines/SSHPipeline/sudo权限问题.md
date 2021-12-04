# sudo 权限问题

通过 `ssh pipeline` 执行远程命令的时候有时候会执行带有 `sudo` 权限的命令，这个时候就会有如下三种情况：

## 没有权限

那这个很容易理解，没有权限很正常，报错也是清晰明了—— `Permission denied`

示例：

```bash
+ nginx -s reload
nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)
2021/11/17 10:37:12 [warn] 24406#24406: the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /etc/nginx/nginx.conf:1
2021/11/17 10:37:12 [notice] 24406#24406: signal process started
2021/11/17 10:37:12 [alert] 24406#24406: kill(2494, 1) failed (1: Operation not permitted)
```

## 拥有输入权限，但是要输入密码

尽管用户拥有 `sudo` 权限，但是在执行带有 `sudo` 标识的命令时需要**输入密码**才行，这个时候就会报如下错误：

```bash
sudo: no tty present and no askpass program specified
```

这时候**建议**新建一个 `cicd` 用户，专门用于此处执行 `sudo` 权限内容，并且无需输入密码。编辑 `/etc/sudoers` 文件：

```bash
$ sudo vim /etc/sudoers
```

注意下列配置中的高亮行。

```ini {6}

# User privilege specification

root	ALL=(ALL: ALL) ALL
ubuntu	ALL=(ALL: ALL) ALL
drone	ALL=(ALL: ALL) NOPASSWD: ALL

# Members of the admin group may gain root privileges

%admin ALL=(ALL) ALL
```

## 拥有sudo权限，不需要输入密码

这个没有问题，直接执行成功。
