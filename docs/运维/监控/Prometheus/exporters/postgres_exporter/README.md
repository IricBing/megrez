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