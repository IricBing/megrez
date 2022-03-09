# 备份与还原

## 备份

```bash
$ mongodump -d <dbname> -o . -u=<username> -p=<password>
```

## 还原

```bash
$ mongorestore -d=<dbname> ./<dir>/ -u=<username> -p=<password>
```
