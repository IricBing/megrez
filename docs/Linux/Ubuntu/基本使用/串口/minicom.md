# minicom

## 安装

```bash
$ sudo apt install minicom
```

## 运行

```bash
$ sudo minicom -s
```

> [!tip|label: 提示]
> 因为默认操作 `/dev/tty` 串口需要 `sudo` 权限，所以这里直接以 `sudo` 权限运行了 `minicom` ，如果不想用 `sudo` 权限，可以修改 `/dev/tty` 串口的文件属性。
