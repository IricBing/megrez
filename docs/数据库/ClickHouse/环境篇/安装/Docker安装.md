# Docker 安装

[官方文档](https://clickhouse.com/docs/zh/getting-started/install/#from-docker-image)

[Docker Hub](https://hub.docker.com/r/clickhouse/clickhouse-server/)

`docker-compose.yaml` 配置

```yaml
version: "3"
services:
  clickhouse:
    image: clickhouse/clickhouse-server:22.2.3.5
    container_name: clickhouse
    hostname: clickhouse
    restart: always
    ports:
      - 8123:8123
      - 9000:9000
    volumes:
      - clickhouse-data:/var/lib/clickhouse
      - clickhouse-config:/etc/clickhouse-server

volumes:
  clickhouse-data:
  clickhouse-config:
```
