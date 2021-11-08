# Ingress

`Ingress` 公开了从集群外部到集群内服务的 `HTTP` 和 `HTTPS` 路由，流量路由由 `Ingress` 资源上定义的规则控制。

下面是一个将所有流量都发送到同一 `Service` 的简单 `Ingress` 示例：

![Ingress流量转发示意](assets/images/Ingress流量转发示意.png)
