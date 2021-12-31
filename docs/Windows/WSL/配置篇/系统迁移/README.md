# 系统迁移

## 为什么要迁移

由于`WSL`默认安装到**C盘**，所以在大多数情况下都必须迁移。

## 导出子系统镜像

```bash
$ wsl -l -v
  NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
  Ubuntu-20.04           Stopped         1

$ wsl -t Ubuntu-20.04   # 关闭子系统

$ wsl --export Ubuntu-20.04 Ubuntu-20.04.tar    # 导出
```

## 删除现有子系统

```bash
$ wsl --unregister Ubuntu-20.04
正在注销...
```

## 重建子系统

```bash
$ wsl --import Ubuntu-20.04 D:\WSL\Ubuntu-20.04 Ubuntu-20.04.tar
```

> [!warning|label: 注意]
> 由于使用 `$ wsl -l -v` 命令查看到 `Ubuntu-20.04` 子系统的版本是 `1` ，所以采用上述重建命令，如果版本是 `2` ，则重建的时候要加上 `--version 2` ，即： `$ wsl --import Ubuntu-20.04 D:\WSL\Ubuntu-20.04 Ubuntu-20.04.tar --version 2`
