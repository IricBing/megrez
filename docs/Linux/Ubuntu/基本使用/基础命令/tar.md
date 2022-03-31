# Ubuntu tar 命令

`tar` 命令用来打包。

> [!warning|label: 注意]
> 这里是打包，不是压缩！压缩只是**附带**的功能！可以只打包不压缩!

## 打包

```bash
$ tar -cvf dist.tar ./dist/     # 将dist文件夹打包为dist.tar文件

$ tar -zcvf dist.tar.gz ./dist/     # 打包后以gzip压缩
```

## 解包

```bash
$ tar -xf dist.tar     # 将dist.tar包解压到当前目录
$ tar -zxf dist.tar     # 将dist.tar包解压到当前目录（打包时采用了gzip压缩）
```

## 查看包中的内容

```bash
$ tar -tvf dist.tar     # 查看dist.tar包中的文件信息
```

## 加密与解密

```bash
# 加密
$ tar -czvf - test.txt | openssl des3 -salt -k '123456' -out backup.tar.gz

# 解密
$ openssl des3 -d -k '123456' -salt -in backup.tar.gz | tar xzf -
```

使用 `dd` 命令：

```bash
# 加密
$ tar -zcvf - test.txt | openssl des3 -salt -k '123456' | dd of=backup.des3

# 解密
$ dd if=backup.des3 | openssl des3 -d -k '123456' | tar -zvxf -
```

> [!tip|label: 提示]
> 上述命令中 `'123456'` 为压缩和解压缩密码。
