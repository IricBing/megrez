# 构建Docker镜像——多阶段构建

> [!tip|label: 提示]
> 参考笔记：[vscode工程配置](../配置篇/vscode工程配置.md)添加 `Docker` 支持

## 思想

**Step1**

建立构建阶段，将**源码**和**打包相关**的文件拷贝到镜像中。

**Step2**

首先安装 `pnpm` ，之后安装所有依赖，并执行打包命令。

**Step3**

开始生产构建，将上一阶段打包出来的**dist文件夹**和**package.json文件**、**.npmrc文件**和**pnpm-lock.yaml文件**拷贝到镜像中。

**Step4**

安装开发依赖，等等，流程与直接构建一样了，可参考笔记：[构建Docker镜像](./构建Docker镜像.md)

## 完整示例文件

```Dockerfile
# Stage 1
FROM node:16.13.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm i pnpm -g --registry=http://registry.npmmirror.com
RUN pnpm i --frozen-lockfile --ignore-scripts

RUN pnpm build:prod

# Stage 2
FROM node:16.13.0-alpine as prod

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# 设置NODE最大可用内存
# ENV NODE_OPTIONS=--max-old-space-size=6144

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.npmrc .
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

RUN npm i pnpm -g --registry=http://registry.npmmirror.com
RUN pnpm i --frozen-lockfile --ignore-scripts --prod

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node" ,"dist/main.js"]
```

> [!tip|label: 提示]
> 关于多阶段更深入的介绍可以参考笔记：[Docker 多阶段构建](../../../容器/Docker/镜像构建/多阶段构建.md)

> [!attention|label: 警告]
> 如果构建基于 `grpc` 的微服务，可能采坑，如遇到 `proto` 文件没有打包的情况，转至笔记：[GRPC打包proto文件缺失](../填坑手册/grpc打包proto文件缺失.md)

