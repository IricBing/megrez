# Ubuntu 20.04 安装

> [!warning|label: 注意]
> `apt` 中默认包含了 `clickhouse-server` 和 `clickhouse-client` 两个软件源，但是不能直接使用！！！因为他们的**版本太老**了。

直接使用 `apt` 安装即可：

```bash
$ sudo apt-get install -y apt-transport-https ca-certificates dirmngr
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 8919F6BD2B48D754
$ echo "deb https://packages.clickhouse.com/deb stable main" | sudo tee /etc/apt/sources.list.d/clickhouse.list
$ sudo apt update && sudo apt install -y clickhouse-server clickhouse-client
$ sudo service clickhouse-server start

$ clickhouse-client   # 启动client客户端
```
