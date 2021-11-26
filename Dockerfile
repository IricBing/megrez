# Stage 1
FROM node:16.13.0-alpine as builder

WORKDIR /app

COPY . .

RUN node index.js

# Stage 2
FROM nginx:alpine as prod

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

COPY --from=builder /app/docs .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80