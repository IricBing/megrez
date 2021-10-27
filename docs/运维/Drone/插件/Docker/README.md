# Docker

[插件地址](http://plugins.drone.io/drone-plugins/drone-docker/)

## 功能

可以进行Docker镜像打包构建、并发布到Docker Hub或私有仓库。

## 基础配置示例

### 阿里云容器镜像服务

```yaml
kind: pipeline
type: docker
name: build

steps:
  - name: docker
    image: plugins/docker
    settings:
      repo: registry.cn-shanghai.aliyuncs.com/virtualbing/megrez
      registry: registry.cn-shanghai.aliyuncs.com
      username: iricbing
      password: xxxxxxxx
      tags: latest
      auto_tag_suffix: linux-amd64
      no_cache: true
```

### Docker Hub

```yaml
kind: pipeline
type: docker
name: build

steps:
  - name: docker
    image: plugins/docker
    settings:
      repo: iricbing/megrez
      username: iricbing
      password: xxxxxxxx
      tags: latest
      no_cache: true
```
## 配置项
