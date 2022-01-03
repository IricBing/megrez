# IP 地址

## 查看自己的IP地址

```bash
$ hostname -I | awk '{print $1}'
```

## 查看宿主机的IP地址

```bash
$ cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }'
```