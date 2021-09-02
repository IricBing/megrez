# Docker Compose 部署 PostgreSQL 单机版——基于Ubuntu （含有pgadmin）

## Step1. 创建docker-compose.yml文件

```yaml
version: '3'
services:
  postgres:
    image: postgres:13-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: iot
      TZ: Asia/Shanghai
      PGTZ: Asia/Shanghai
    ports:
      - '5432:5432'
    volumes:
      - $PWD/pg-data:/var/lib/postgresql/data
    container_name: postgresql

  pgadmin:
    image: dpage/pgadmin4:latest
    restart: always
    environment: 
      PGADMIN_DEFAULT_EMAIL: iricbing@gmail.com
      PGADMIN_DEFAULT_PASSWORD: 123456
    ports:
      - "5433:80"
    container_name: pgadmin
```

## Step2. 启动服务

```shell
$ docker-compose up -d 
```
