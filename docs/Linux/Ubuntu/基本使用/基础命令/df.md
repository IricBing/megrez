# `df` 命令

## 功能

`Ubuntu` 中 `df` 命令的功能是**用来检查主机文件系统的磁盘空间占用情况**。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

显示指定磁盘文件的可用空间。如果没有文件名被指定，则所有当前被挂载的文件系统的可用空间将被显示。

默认情况下，磁盘空间将以 `1KB` 为单位进行显示，除非环境变量 `POSIXLY_CORRECT` 被指定，那样将以 `512字节` 为单位进行显示

## 命令格式

```bash
$ df [选项] [文件]
```

## 命令参数

### 必要参数

* `-a` ： 全部文件系统列表
* `-h` ： 方便阅读方式显示
* `-H` ： 等于`“-h”`，但是计算式，`1K=1000`，而不是`1K=1024`
* `-i` ： 显示`inode`信息
* `-k` ： 区块为`1024`字节
* `-l` ： 只显示本地文件系统
* `-m` ： 区块为`1048576`字节
* `--no-sync` ：忽略 `sync` 命令
* `-P` ： 输出格式为`POSIX`
* `--sync` ： 在取得磁盘信息前，先执行`sync`命令
* `-T` ： 文件系统类型

### 可选参数

* `--block-size=<区块大小>` ： 指定区块大小
* `-t<文件系统类型>` ： 只显示选定文件系统的磁盘信息
* `-x<文件系统类型>` ： 不显示选定文件系统的磁盘信息
* `--help` ： 显示帮助信息
* `--version` ： 显示版本信息

## 使用实例

### 显示磁盘使用情况

```bash
$ df
文件系统               1K-块        已用     可用     已用% 挂载点
/dev/sda7             19840892    890896  17925856   5% /
/dev/sda9            203727156 112797500  80413912  59% /opt
/dev/sda8              4956284    570080   4130372  13% /var
/dev/sda6             19840892   1977568  16839184  11% /usr
/dev/sda3               988116     23880    913232   3% /boot
tmpfs                 16473212         0  16473212   0% /dev/shm
```

**说明**

`linux` 中 `df` 命令的输出清单的第1列是代表**文件系统对应的设备文件的路径名**（一般是硬盘上的分区）；

第 `2` 列给出分区包含的数据块（ `1024` 字节）的数目；

第 `3` ， `4` 列分别表示已用的和可用的数据块数目。

> 用户也许会感到奇怪的是，第 `3` ， `4` 列块数之和不等于第 `2` 列中的块数。这是因为缺省的每个分区都留了少量空间供系统管理员使用。即使遇到普通用户空间已满的情况，管理员仍能登录和留有解决问题所需的工作空间。

清单中 `已用%` 列表示普通用户空间使用的百分比，即使这一数字达到 `100％` ，分区仍然留有系统管理员使用的空间。

`挂载点` 列表示文件系统的挂载点。

### 以更易读的方式显示带有文件类型的磁盘空间和使用情况（最常用）

```bash
$ df -Th
```
