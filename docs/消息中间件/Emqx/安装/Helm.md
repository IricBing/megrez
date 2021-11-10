# Helm安装

## 添加Helm仓库

```shell
$ helm repo add emqx https://repos.emqx.io/charts
$ helm repo update
```

## 查询EMQ X Broker

```shell
$ helm search repo emqx
NAME         CHART VERSION APP VERSION DESCRIPTION
emqx/emqx    v4.0.0        v4.0.0      A Helm chart for EMQ X
emqx/emqx-ee v4.0.0        v4.0.0      A Helm chart for EMQ X
emqx/kuiper  0.1.1         0.1.1       A lightweight IoT edge analytic software
```

## 启动集群

```shell
$ helm install my-emqx emqx/emqx
```

## 查看状态

```shell
$ kubectl get pods
NAME       READY  STATUS             RESTARTS  AGE
my-emqx-0  1/1     Running   0          56s
my-emqx-1  1/1     Running   0          40s
my-emqx-2  1/1     Running   0          21s

$ kubectl exec -it my-emqx-0 -- emqx_ctl cluster status
Cluster status: #{running_nodes =>
                      ['my-emqx@my-emqx-0.my-emqx-headless.default.svc.cluster.local',
                       'my-emqx@my-emqx-1.my-emqx-headless.default.svc.cluster.local',
                       'my-emqx@my-emqx-2.my-emqx-headless.default.svc.cluster.local'],
                  stopped_nodes => []}
```