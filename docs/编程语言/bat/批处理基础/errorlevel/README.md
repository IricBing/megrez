# errorlevel

`errorlevel` 为**程序返回码**。

使用如下所示：

```batch
echo %errorlevel%
```

每个命令运⾏结束，可以⽤这个命令⾏格式查看返回码⽤于判断刚才的命令是否执⾏成功。默认值为 `0` ，⼀般命令执⾏出错会设 `errorlevel` 为 `1`
