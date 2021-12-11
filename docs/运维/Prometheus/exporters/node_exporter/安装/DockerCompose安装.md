# Docker Compose 安装

```yaml
version: '3.8'

services:
  node_exporter:
    # image: quay.io/prometheus/node-exporter:latest
    image: prom/node-exporter:latest
    container_name: node_exporter
    command:
      - '--path.rootfs=/host'
    network_mode: host
    pid: host
    restart: unless-stopped
    volumes:
      - '/:/host:ro,rslave'
```

> [!tip|label: 提示]
> 注释部分采用的是 `RedHat` 的镜像仓库。

运行成功后查看本地参数：

```bash
$ curl 127.0.0.1:9100/metrics
```
