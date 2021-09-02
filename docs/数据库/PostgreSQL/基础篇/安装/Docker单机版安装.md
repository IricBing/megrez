# Docker 安装 PostgreSQL 单机版——基于Ubuntu

## Step1. 拉取镜像

``` shell
$ docker pull postgres:13-alpine
```

## Step2. 创建本地卷

``` shell
$ docker volume create pgdata
```

## Step3. 启动容器

``` shell
$ docker run -it --name postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_USER=postgres -e TZ=Asia/Shanghai -e PGTZ=Asia/Shanghai -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:13-alpine 
```
