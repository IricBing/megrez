# Docker 开发模式部署

## 为啥要部署开发模式？

因为 `vuepress` 在打包生成 `HTML` 的时候**渲染非常慢**，但是如果不渲染，以开发环境运行，速度还是很可观的，因为找不到优化渲染速度的解决方案，所以不得不**临时**采用开发模式来部署。

> [!tip|label: 说明]
> 当然也是 `md` 文件的数量上来后才出现的现象， `vuepress` 本身也是定位于**轻量级**的文档工具，拿他应用到那种知识库量级的产品会明显力不从心，网上也发现了这个问题，参见这个[issue](https://github.com/vuejs/vuepress/issues/2922)

## 配置

在根目录下建立 `.dockerignore` 文件和 `Dockerfile` 文件，分别写入如下内容：

```ignore
**/*
!package.json
!yarn.lock

!./docs/
```

```docker
FROM node:14.17.4-alpine

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 设置NODE最大可用内存
ENV NODE_OPTIONS=--max-old-space-size=6144

# 此处可以这样写的原因是在Dockerfile文件相同目录下有.dockerignore文件（类似于git提交时的.gitignore文件）
COPY . .

# 安装依赖
RUN yarn install --frozen--lockfile --ignore-scripts

EXPOSE 8080

CMD ["yarn" ,"start"]
```

> [!tip|label:提示]
> `Dockerfile` 中的 `node` 版本需要根据项目中的 `node` 版本选择，**尽量保持一致**。


## 打包

镜像打包命令：

```shell
$ docker build --no-cache -t megrez .
```

临时运行命令：

```shell
$ docker run -it --rm --name megrez -p 8080:8080 megrez
```
