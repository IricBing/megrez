# Docker Compose 部署 PostgreSQL 单机版——基于Ubuntu （含有pgadmin）

## Step1. 创建docker-compose.yml文件

```yaml
version: '3'
services:
  postgres:
    image: postgres:13-alpine
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

## Step2. 启动服务

```bash
$ docker-compose up -d 
```
