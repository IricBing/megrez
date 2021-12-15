# Docker 安装

使用 `RedHat` 镜像仓库：

```bash
$ docker run -d \
  --name node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  quay.io/prometheus/node-exporter:latest \
  --path.rootfs=/host
```

使用 `Docker Hub` ：

```bash
$ docker run -d \
  --restart always \
  --name node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  prom/node-exporter:latest \
  --path.rootfs=/host
```

运行成功后查看本地参数：

```bash
$ curl 127.0.0.1:9100/metrics
```
