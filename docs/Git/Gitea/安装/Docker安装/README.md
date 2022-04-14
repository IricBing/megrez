# Docker 安装

[官方文档](https://docs.gitea.io/zh-cn/install-with-docker)

编写 `docker-compose.yaml` 文件，写入如下内容：

```yaml
version: "3"

services:
  server:
    image: gitea/gitea:1.16.5
    container_name: gitea
    restart: always
    environment:
      - USER_UID=1000
      - USER_GID=1000
    networks:
      - gitea
    volumes:
      - gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"

networks:
  gitea:
    external: false

volumes:
  gitea:
    driver: local
```

启动服务命令：

```bash
$ docker-compose up -d
```
