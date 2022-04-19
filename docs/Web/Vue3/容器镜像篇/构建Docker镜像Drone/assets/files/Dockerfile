# Stage 1
FROM registry.cn-hangzhou.aliyuncs.com/xxx/xxx:latest as builder

WORKDIR /app

COPY .env.production .
COPY public public
COPY src src
COPY index.html .
COPY nginx.conf .

RUN pnpm build

# Stage 2
FROM nginx:1.20.2-alpine as prod

LABEL maintainer="Iric<iricbing@gmail.com>"

WORKDIR /app

# 设置时区
RUN echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80