# Docker 版数据库

> [!tip]
> 本笔记的现实环境是数据库用 `Docker` 安装的。

## 准备数据文件

首先将数据库备份文件拷贝到容器内部，如下所示：

```bash
$ docker cp dbname.sql postgresql:/var/lib/postgresql
```

> [!tip]
> `dbname.sql` 为 `dbname` 数据库的全量备份文件。

## 恢复数据库

```bash
$ docker exec -it postgresql /bin/bash
$ su postgres
$ cd ~

$ psql dbname < dbname.sql    # 恢复语句
```

> [!tip]
> 上述命令的前提是在 `dbname` 数据库**已经存在**的情况下，如果 `dbname` 数据库不存在，需要先建立数据库，建立数据库命令： `$ CREATE DATABASE my_db;`
