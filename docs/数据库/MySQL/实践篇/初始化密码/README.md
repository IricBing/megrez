# 初始化密码

当通过 `apt` 命令直接安装 `MySQL` 后，使用 `sudo mysql` 命令连接到 `MySQL` 数据库。

```sql
$ use mysql;
$ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的新密码';
$ UPDATE user SET plugin='mysql_native_password'  WHERE User='root';
$ flush privileges;
```

退出，之后就能通过命令： `mysql -u root -p` 来登录了。
