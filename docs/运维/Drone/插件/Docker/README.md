# Docker

[插件地址](http://plugins.drone.io/drone-plugins/drone-docker/)

## 功能

可以进行 `Docker` 镜像打包构建、并发布到 `Docker Hub` 或**私有仓库**。

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

### 使用git tag来作为docker tag

`Drone` 原生提供了[DRONE_TAG](https://docs.drone.io/pipeline/environment/reference/drone-tag/)环境变量，可以直接使用。

```yaml
  - name: build
    image: plugins/docker
    settings:
      tags:
        - ${DRONE_TAG}
        - latest
```

在很多场景下，我们在 `git` 打 `tag` 的时候在前面会加上一个 `v` ，例如： `v1.0.1` ，然而我们不想将 `v` 也打进去，就可以通过 `${DRONE_TAG##v}` 这样的字符串操作来实现去除最前面的 `v` 字母的需求。

`Drone` 支持的字符串操作来自于 `gun` 的[shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
