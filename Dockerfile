FROM node:16.13.0-alpine

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 设置NODE最大可用内存
ENV NODE_OPTIONS=--max-old-space-size=6144

# 此处可以这样写的原因是在Dockerfile文件相同目录下有.dockerignore文件（类似于git提交时的.gitignore文件）
COPY . .

# 安装依赖
RUN yarn install --ignore-scripts

EXPOSE 8080

CMD ["yarn" ,"start"]