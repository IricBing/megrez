# MongoDB exporter
* [GitHub地址](https://github.com/percona/mongodb_exporter)
* [Docker Hub](https://hub.docker.com/r/percona/mongodb_exporter)

一键启动命令：

```bash
$ docker run --rm --net=host percona/mongodb_exporter:0.32 --mongodb.uri=mongodb://localhost:27017
```

测试：

```bash
$ curl 127.0.0.1:9216/metrics
```