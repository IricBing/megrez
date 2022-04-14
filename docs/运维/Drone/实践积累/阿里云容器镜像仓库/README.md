# 阿里云容器镜像仓库

使用 `Drone` 自动构建并推送至阿里云容器镜像仓库中的配置（私有仓库）

## 使用docker in docker

```yaml
  - name: build
    image: plugins/docker:20.10.9
    settings:
      repo: registry.cn-hangzhou.aliyuncs.com/xx/xxx
      registry: registry.cn-hangzhou.aliyuncs.com
      username: xxxxx
      password: xxxxx
      tags: develop
      auto_tag_suffix: linux-amd64
```

## 使用docker:dind

```yaml
  - name: build
    image: docker:dind
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - docker build --no-cache -t xxx:tag .
      - docker tag xxx:tag registry.cn-hangzhou.aliyuncs.com/xx/xxx:tag
      - docker login --username=xxx --password=xxx registry.cn-hangzhou.aliyuncs.com
      - docker push registry.cn-hangzhou.aliyuncs.com/xx/xxx:tag
```
