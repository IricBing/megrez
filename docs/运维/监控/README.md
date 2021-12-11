# 监控

在目前看来，开源监控系统的主流方案已经确定成 `Grafana+Prometheus` 了，作为没有历史包袱的新手来说，无需选型，直接上即可。

对于这套方案，由于 `Prometheus` 设计成了**单节点**运行，所有最佳的部署方式就是 `Docker Compose` 一键部署了，转至笔记：[DockerCompose完整配置](DockerCompose完整配置/README.md)
