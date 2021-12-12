# Docker Compose 完整配置

## docker-compose.yaml

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
> `node_exporter` 占用 `9100` 端口，使用 `host` 网络，因此处于容器网络中的 `prometheus` 和 `grafana` 是不能通过 `hostname` 来访问的，需要通过**网关**的 `ip` 来访问，使用 `$ docker inspect prometheus` 命令来查看**网关ip**。

## Prometheus 配置

接下来配置 `prometheus` ，首先通过命令： `$ docker volume ls` 命令找到volume具名挂在的名称，如下所示：

```bash
$ docker volume ls
DRIVER    VOLUME NAME
local     d927b4b286e87a17f4e66d0a840a72f2b6c8403d370313526b1618a94bc864fd
local     monitor_alertmanager-data
local     monitor_grafana-data
local     monitor_prometheus-data
```

这样就知道 `monitor_prometheus-data` 就是 `prometheus` 容器挂载的**卷**了，接下来通过 `$ docker volume inspect monitor_prometheus-data` 命令拿到存储地址：

```bash
$ docker volume inspect monitor_prometheus-data
[
    {
        "CreatedAt": "2021-12-11T21:46:35+08:00",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "monitor",
            "com.docker.compose.version": "1.29.2",
            "com.docker.compose.volume": "prometheus-data"
        },
        "Mountpoint": "/var/lib/docker/volumes/monitor_prometheus-data/_data",
        "Name": "monitor_prometheus-data",
        "Options": null,
        "Scope": "local"
    }
]
```

由 `Mountpoint` 字段可以知道，这个卷的实际位置在 `/var/lib/docker/volumes/monitor_prometheus-data/_data` 路径下，接下来编辑 `prometheus.yml` 文件，写配置即可。

```bash
$ sudo vim /var/lib/docker/volumes/monitor_prometheus-data/_data/prometheus.yml
```

配置示例：

```yaml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]
        labels:
          instance: "prometheus"

  - job_name: "linux"
    static_configs:
      - targets: ["192.168.0.1:9100"]   # 注意这里写的是网关的ip
        labels:
          instance: "本机"
      
  - job_name: "grafana"
    static_configs:
      - targets: ["grafana:3000"]
        labels:
          instance: "grafana"
      
  - job_name: "外部服务器"
    scheme: https
    basic_auth:
      username: prometheus
      password: basic auth密码
    static_configs:
      - targets: ["外部服务域名"]
        labels:
          instance: "外部服务器"
```
