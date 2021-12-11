# Docker Compose 完整配置

下载：<a href="运维/监控/DockerCompose完整配置/assets/files/docker-compose.yaml" download="docker-compose.yaml">docker-compose.yaml</a>

```yaml
version: '3.8'

services:
  grafana:
    image: grafana/grafana:8.3.2
    container_name: grafana
    hostname: grafana
    restart: always
    ports:
      - '9000:3000'
    volumes:
      - grafana-data:/var/lib/grafana
      - /etc/localtime:/etc/localtime:ro

  prometheus:
    image: prom/prometheus:v2.31.1
    container_name: prometheus
    hostname: prometheus
    restart: always
    ports:
      - '9090:9090'
    volumes:
      - prometheus-data:/etc/prometheus
      - /etc/localtime:/etc/localtime:ro

  node_exporter:
    # image: quay.io/prometheus/node-exporter:latest
    image: prom/node-exporter:v1.3.1
    container_name: node_exporter
    hostname: node_exporter
    restart: always
    network_mode: host
    pid: host
    command:
      - '--path.rootfs=/host'
    volumes:
      - '/:/host:ro,rslave'
      - /etc/localtime:/etc/localtime:ro

  alertmanager:
    image: prom/alertmanager:v0.23.0
    container_name: alertmanager
    hostname: alertmanager
    restart: always
    ports:
      - '9093:9093'
    volumes:
      - alertmanager-data:/etc/alertmanager
      - /etc/localtime:/etc/localtime:ro

volumes:
  grafana-data:
  prometheus-data:
  alertmanager-data:
```

> [!note]
> 配置时间：**2021年12月11日**，重新部署请**升级镜像版本**。

> [!tip]
> `node_exporter` 占用 `9100` 端口，使用 `host` 网络。
