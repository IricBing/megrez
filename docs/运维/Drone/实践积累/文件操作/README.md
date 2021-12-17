# 文件操作

> [!note]
> 基于[DockerRunner](../../安装Runners/DockerRunner/README.md)

## 原理

`DockerRunner` 的每一个 `Step` 都是基于一个 `docker image` 的，因此，我们就可以借助庞大的 `docker` 镜像来实现各种各样的操作，例如，我们可以基于 `alpine` 镜像来执行各种各样的 `Linux` 命令，基于 `node` 镜像来执行 `npm` 构建，基于 `ssh` 镜像来执行**远程操作服务器**等等。

## 实现

上面已经提到了，可以基于 `alpine` 镜像来执行 `Linux` 命令，例如在代码根目录下生成一个 `.version` 文件就可以用如下的写法来实现：

```yaml
---
kind: pipeline
type: docker
name: production deploy

steps:
  - name: auto tag
    image: alpine:latest
    commands:
      - echo -n "VERSION="${DRONE_TAG##v} > .version
```
