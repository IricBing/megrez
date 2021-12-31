# Docker 镜像缓存

## Step中镜像缓存

```yaml
kind: pipeline
type: docker
name: production deploy

clone:
  disable: true

steps:
  - name: clone & auto tag
    image: alpine/git:v2.32.0
    environment:
      SSH_KEY:
        from_secret: deploy_key
    commands:
    ...

  - name: build
    image: plugins/docker:20.10.9
    settings:
    ...

  - name: deploy
    image: appleboy/drone-ssh:1.6.3
    settings:
      host: xxx.xxx.xxx.xxx
      username: ubuntu
      password:
        from_secret: server_ubuntu_password
      port: 22
      script:
        - cd /home/ubuntu/code && docker-compose pull
        - cd /home/ubuntu/code && docker-compose up -d
        - docker image prune -f
```

## Dockerfile构建缓存

[官方文档](https://docs.drone.io/pipeline/docker/examples/services/docker/)

> [!note]
> 这里需要使用 `Drone` 的管理员账户，如果 `Drone` 初始化的时候没有管理员账号，要重新装。

首先要在 `Drone` 中开启这个项目的 `Trusted` 配置，因为使用外部 `Docker` 是一件非常有**风险**的事情，因此 `Drone` 设置为只允许**受信任**的应用访问外部 `Docker` 。

![开启Trusted](assets/images/开启Trusted.png)

```yaml
  - name: build
    image: docker:dind
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - docker ps -a
      - docker build --no-cache -t ip2region .

volumes:
- name: dockersock
  host:
    path: /var/run/docker.sock
```