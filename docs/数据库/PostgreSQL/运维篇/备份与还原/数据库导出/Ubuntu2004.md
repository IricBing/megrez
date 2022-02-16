# Ubuntu 20.04 

## Step1. 切换到postgres用户

打开终端，切换到 `postgres` 用户，如下所示：

```bash
$ sudo -i -u postgres
```

## Step2. 全量导出

```bash
$ pg_dump -U postgres dbname > dbname.sql
```

> [!tip|label: 提示]
> `dbname` 为数据库名称。

得到的 `dbname.sql` 文件就是该数据库的全量信息文件了。
