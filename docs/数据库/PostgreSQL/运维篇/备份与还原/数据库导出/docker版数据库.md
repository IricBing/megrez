# Docker 版数据库

> [!tip]
> 本笔记的现实环境是数据库用 `Docker` 安装的。

## Step1. 进入容器中

```bash
$ docker exec -it [image id / image name] /bin/bash
```

## Step2. 切换到postgres用户

```bash
$ su postgres
```

## Step3. 全量导出数据库

```bash
$ cd ~

$ pg_dump -U postgres dbname > dbname.sql
```

> [!tip|label: 提示]
> `dbname` 为数据库名称。

## Step4. 将文件拷贝到容器外部

经历上述三个步骤就将数据库导出成了 `dbname.sql` 文件了，里面包含数据库的全量信息。

最后一步只需要将 `dbname.sql` 文件从容器内部移动到容器外部即可。

```bash
$ docker cp ud-postgresql:/var/lib/postgresql/dbname.sql .
```

> [!warning|label: 注意]
> `$ docker cp` 命令是在宿主机中执行的。
