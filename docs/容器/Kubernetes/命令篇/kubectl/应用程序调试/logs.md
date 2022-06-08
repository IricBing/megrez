# kubectl logs
* [官方文档](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#logs)

打印 `pod` 中容器或指定资源的**日志**。如果 `pod` 只有一个容器，则容器名称是可选的。

## 用法

```bash
$ kubectl logs [-f] [-p] (POD | TYPE/NAME) [-c CONTAINER]
```

指令：

## 常用命令

### 查看上一次容器退出日志

```bash
$ kubectl logs -p master-844bf85746-hfsk7 -n center
```