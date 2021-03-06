# 允许远程访问

## Step1. 修改配置文件

```bash
$ sudo vim /etc/mysql/mysql.conf.d/mysqld.conf
```

找到 `bind-address  =127.0.0.1` 将其注释掉，也可以改成 `bind-address  =0.0.0.0` ，目的是不再只允许本机访问。

## Step2. 重启服务

```bash
$ sudo service mysql restart
```

## Step3. 连接MySQL并修改数据库配置

```bash
$ mysql -u root -p
```

```sql
$ use mysql;
$ update user set host='%' where user ='root';
$ flush privileges;     --立即刷新权限表，使添加的用户生效 
$ GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;  --授权
```

授权语句命令解释：

* `*.*`     

第一个 `*` 表示库，第二个 `*` 表示表; `*.*` 对全部数据库的全部表授权，例如： `so.ok` 表示只对 `so` 这个库中的 `ok表` 授权

* `root`

表示要给哪个用户授权，这个用户可以是存在的用户，也可以是不存在的

* `'%'`      

表示允许远程连接的IP地址， `%` 代表**允许所有IP连接**

## Step4. 开通防火墙3306端口

```bash
$ sudo ufw allow 3306
```
