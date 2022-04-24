# 备份与还原

> [!tip|label: 提示]
> 备份与还原是在 `bash` 终端执行的，而不是在 `mongo` 中执行的！

`MongoDB` 的数据备份与恢复分为两种，一种是针对**数据库**的 `mongodump` 和 `mongorestore` ，一种是针对**数据库中表**的 `mongoexport` 和mongoimport。

## 数据库

### mongodump——备份

```bash
$ mongodump -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> -c <collection> -q <filter_condition> -o <文件存放路径>
```

参数说明：

|参数|含义|
|-----|-----|
| `-h` |指明数据库宿主机的 `IP` |
| `--port` |指明数据库的**端口**|
| `-u` |指明数据库的**用户名**|
| `-p` |指明数据库的**密码**|
| `-d` |指明数据库的名字|
| `-c` |指明 `collection` 的名字|
| `-o` |指明到要导出的文件名|
| `-q` |指明导出数据的**过滤条件**|

示例：

```bash
$ mongodump -d dawen -o . 
```

### mongorestore——还原

```bash
$ mongorestore -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> --drop <备份文件存放路径>
```

参数说明：

|参数|含义|
|-----|-----|
| `-h` |指明数据库宿主机的 `IP` |
| `--port` |指明数据库的**端口**|
| `-u` |指明数据库的**用户名**|
| `-p` |指明数据库的**密码**|
| `-d` |指明数据库的名字|
| `--drop` |先删除所有的记录，然后恢复|

示例：

```bash
$ mongorestore -d=dawen /root/dawen
```

## 数据表

### mongoexport——导出

```bash
$ mongoexport -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> -c <collection> -f <field> -q <filter_condition> --csv -o <文件名>
```

参数说明：

|参数|含义|
|-----|-----|
| `-h` |指明数据库宿主机的 `IP` |
| `--port` |指明数据库的**端口**|
| `-u` |指明数据库的**用户名**|
| `-p` |指明数据库的**密码**|
| `-d` |指明数据库的名字|
| `-c` |指明 `collection` 的名字|
| `-f` |导出指定字段，以**逗号**分割， `-f uid,name,age` 导出 `uid` , `name` , `age` 这三个字段|
| `-q` |可以根据查询条件导出， `-q '{ "uid" : "100" }'` 导出 `uid` 为 `100` 的数据|
| `--csv` 表示导出的文件格式为 `csv` 的。这个比较有用，因为大部分的关系型数据库都是支持 `csv` ，在这里有共同点|
| `-o` |指明到要导出的文件名|

> [!tip|label: 提示]
> 如果不加 `--csv` ，则默认导出的是 `MongoDB` 独有的格式。

### mongoimport——导入

#### 恢复整表导出的非csv文件

```bash
$ mongoimport -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> -c <collection> --upsert --drop <文件名>
```

特殊参数说明：

|参数|含义|
|-----|-----|
| `--upsert` |插入或者更新现有数据|

#### 恢复部分字段的导出文件

```bash
$ mongoimport -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> -c <collection>  --upsertFields <字段> --drop <文件名>
```

特殊参数说明：

|参数|含义|
|-----|-----|
| `--upsertFields` |更新部分的查询字段，必须为**索引**, 以**逗号**分隔|

#### 恢复导出的csv文件

```bash
$ mongoimport -h <IP> --port <port> -u=<username> -p=<password> -d <dbname> -c <collection> --type <type> --headerline --upsert --drop <文件名>
```

特殊参数说明：

|参数|含义|默认值|
|-----|-----|-----|
| `--type` |导入的文件类型| `json` |
