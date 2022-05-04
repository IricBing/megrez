# 时区问题

## 问题描述

使用 `Docker pipeline` 执行自动挂载时间的时候会导致挂载上去的是 `UTC` 时间，最后打包出来的镜像时间少 `8` 个小时。

```yaml
---
kind: pipeline
type: docker
name: staging deploy

steps:
  - name: auto tag
    image: alpine:3.15.0
    commands:
      - echo VITE_VERSION=staging >> .env.staging
      - echo VITE_VERSION_TIME=`date '+%Y-%m-%d %H:%M:%S'` >> .env.staging

trigger:
  event:
    - push
  branch:
    - master
```

## 解决方案

挂载宿主机的 `/etc/localtime` 到容器内部即可。

```yaml
---
kind: pipeline
type: docker
name: staging deploy

steps:
  - name: auto tag
    image: alpine:3.15.0
    volumes:
      - name: localtime
        path: /etc/localtime
    commands:
      - echo VITE_VERSION=staging >> .env.staging
      - echo VITE_VERSION_TIME=`date '+%Y-%m-%d %H:%M:%S'` >> .env.staging

volumes:
  - name: localtime
    host:
      path: /etc/localtime

trigger:
  event:
    - push
  branch:
    - master
```
