# SSL 和 Basic Auth

## 前言

如果 `Prometheus` 服务和 `node-exporter` 服务不在一台服务器上的时候（大多数都是这样），那么 `Prometheus` 要从 `node-exporter` 中拿数据就不能是简简单单的一个 `http` 请求就行了，要考虑到安全的问题，最好是 `SSL` 和**认证**都需要。

一般的场景下，我们的 `HTTP` 请求都会统一从 `80` 和 `443` 端口进入，不会占用其他端口，所以会先进入 `Nginx` 中，之后再反向代理到具体的服务上。

## 实现

基于上述 `Nginx` 的场景，我们可以在 `Nginx` 层面做 `ssl` 和**认证**，也可以在 `node-exporter` 中做，这两种都可以，如果在 `node-exporter` 层面做 `ssl` ， `Nginx` 层还需要做一遍，会比较麻烦。同时， `node-exporter` 如果用 `Docker` 来启动的话，就要通过**挂载配置文件**的形式来实现 `SSL` 和**认证配置**，这样我们就要维护 `Nginx` 和 `node-exporter` 两个服务的配置了。

> [!note]
> 没有找到通过 `Docker` 环境变量来配置 `node-exporter` 中**认证信息**的方式，网上都是配置文件的形式。

因此，我选择在 `Nginx` 层配置 `SSL` 和**认证**。

`SSL` 的实现参考笔记：[Nginx http转https](../../../../../Nginx/配置篇/http转https.md)

认证选择 `Basic Auth` 认证方式，参考笔记：[Nginx 密码访问](../../../../../Nginx/配置篇/密码访问.md)
