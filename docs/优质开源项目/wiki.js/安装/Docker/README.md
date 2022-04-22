# Docker 安装

## docker compose

`docker-compose.yml` 配置：

```yaml
version: "3.8"

services:
  wikijs:
    image: requarks/wiki:2.5
    restart: always
    environment:
      DB_TYPE: postgres
      DB_HOST: wikijs-postgresql
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: testiot9x
      DB_NAME: wiki
    ports:
      - 3000:3000
    depends_on:
      - wikijs-postgresql

  wikijs-postgresql:
    image: postgres:14.2-alpine3.15
    restart: always
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: testiot9x
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    volumes:
      - wikijs-postgresql-data:/var/lib/postgresql/data

volumes:
  wikijs-postgresql-data:
```
