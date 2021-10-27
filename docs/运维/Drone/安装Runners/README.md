# 安装 Runners

[官方文档](https://docs.drone.io/runner/overview/)

::: warning 注意
在同一个服务器上安装多个 `Runner` 的时候要注意**端口**，因为**默认**都是 `3000` 端口，会造成端口冲突的，修改 `DRONE_HTTP_BIND` 字段即可
:::
