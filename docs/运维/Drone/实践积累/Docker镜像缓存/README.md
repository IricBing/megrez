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

官方文档的思路：https://docs.drone.io/pipeline/docker/examples/services/docker/