# NodeJS 环境

在 `NodeJS` 环境中使用 `fabric` 需要[canvas](https://www.npmjs.com/package/canvas)环境， `canvas` 环境需要操作系统层面的支持，在 `npm` 地址上已经介绍了如何配置，本笔记记录 `Ubuntu 20.04` 与 `Alpine` 在 `Docker` 中的配置。

## Ubuntu 20.04

系统环境配置：

```bash
$ sudo apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

安装依赖：

```bash
$ pnpm add fabric canvas
$ pnpm add -D @types/fabric 
```

## Alpine

在 `Alpine` 中的配置一般与 `Docker` 容器一并使用，本笔记只记录 `Dockerfile` 配置：

```dockerfile

# 开发环境镜像层

FROM node:16.13.1-alpine as builder

LABEL maintainer="Iric<zhangbing@9xing.cn>"

# 更改阿里云镜像源

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 更新软件

RUN apk update

# 安装canvas包所需依赖

RUN apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev

# 设置时区

RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
```
