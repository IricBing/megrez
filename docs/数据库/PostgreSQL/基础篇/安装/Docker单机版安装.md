# Docker 安装 PostgreSQL 单机版——基于Ubuntu

## Step1. 拉取镜像

```bash
$ docker pull postgres:14-alpine
```

## Step2. 创建本地卷

```bash
$ docker volume create pgdata
```

## Step3. 启动容器

```bash
$ docker run -it --name postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_USER=postgres -e TZ=Asia/Shanghai -e PGTZ=Asia/Shanghai -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:13-alpine 
```

## 进入容器执行psql

```bash
$ docker exec -it postgres /bin/bash
$ su postgres
$ psql
```
