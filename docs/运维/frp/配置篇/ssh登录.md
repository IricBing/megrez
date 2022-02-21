# SSH 登录

新建 `/etc/frp/frpc.ini` 文件

```ini
[common]
server_addr = xxx.xxx.xxx.xxx
server_port = 7000
token=xxxx

[home-node1]
type=tcp
local_ip = 127.0.0.1
local_port=22
remote_port=9501
```
启动命令：

```bash
$ docker run --restart=always --network host -d -v /etc/frp/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc
```