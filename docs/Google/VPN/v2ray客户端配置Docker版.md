# V2ray 客户端配置 Docker 版

## Linux（基于Ubuntu）

新建 `/etc/v2ray/config.json` 配置文件，写入如下内容:

```json
{
  "inbounds": [
    {
      "port": 1080,
      "protocol": "socks",
      "settings": {
        "udp": true
      }
    },
    {
      "port": 1088,
      "protocol": "http",
      "settings": {
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "ip地址",
            "port": 443,
            "users": [
              {
                "id": "uuid",
                "level": 1,
                "alterId": 64
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "wsSettings": {
          "path": "/hsh"
        }
      },
      "tlsSettings": {
        "allowInsecure": true
      }
    },
    {
      "protocol": "freedom",
      "tag": "direct",
      "settings": {}
    }
  ]
}
```

启动客户端

```shell
$ docker run -d -p 1080:1080 -p 1088:1088 --name v2ray --restart=always -v /etc/v2ray:/etc/v2ray teddysun/v2ray
```
