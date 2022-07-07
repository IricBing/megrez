# postgres_exporter

* [GitHub地址](https://github.com/prometheus-community/postgres_exporter)

一键启动：

```bash
$ docker run \
  --net=host \
  -e DATA_SOURCE_NAME="postgresql://postgres:password@localhost:5432/postgres?sslmode=disable" \
  quay.io/prometheuscommunity/postgres-exporter
```

测试：

```bash
$ curl 127.0.0.1:9187/metrics
```

> [!tip|label: 提示]
> 一般不这样使用，一般和数据库写在一个 `docker-compose` 配置文件中。如下所示：

```yaml
version: '3'
services:
  postgres:
    image: postgres:14-alpine
    container_name: postgresql
    hostname: postgresql
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: demo
      TZ: Asia/Shanghai
      PGTZ: Asia/Shanghai
    ports:
      - '5432:5432'
    volumes:
      - pg-data:/var/lib/postgresql/data

  postgres-exporter:
    image: prometheuscommunity/postgres-exporter
    container_name: postgres-exporter
    hostname: postgres-exporter
    restart: always
    environment:
      DATA_SOURCE_NAME: postgresql://postgres:123456@postgresql:5432/postgres?sslmode=disable
    ports:
      - 9187:9187

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    hostname: pgadmin
    restart: always
    environment: 
      PGADMIN_DEFAULT_EMAIL: iricbing@gmail.com
      PGADMIN_DEFAULT_PASSWORD: 123456
    ports:
      - "5433:80"

volumes:
  pg-data:
```
