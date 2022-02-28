# 阿里云容器镜像服务

## 前言

通常在国内我们会将自己的镜像放到私有镜像仓库中，而阿里云提供了私有的容器镜像服务解决方案，并且基本上是免费的，个人可以申请**三个**命名空间，同时总的仓库数量不超过 `100` 个即可。

> [!note]
> 目前没有看到有限速这类操作，阿里云倒是说了建议不要超过 `10` 个任务，可能我们的体量还比较小，没有达到是个任务一起并发来上传和下载镜像的时候，也就没有遇到限速问题了。

## 配置

首先，创建私有仓库 `Secret` :

```bash
$ kubectl create secret docker-registry ali-image-secret \
--docker-server=registry.cn-hangzhou.aliyuncs.com \
--docker-username=username \
--docker-password=password \
--docker-email=user@mail.com \
-n my-namespace
```

参数说明：

|参数|作用|备注|
|-----|-----|-----|
| `ali-image-secret` |自定义的 `secret` 名称，写什么都行||
| `docker-server` | 镜像地址||
| `docker-username` | 登录用户名称||
| `docker-password` | 登录用户密码||
| `docker-email` | 登录用户邮箱|**选填**|
| `my-namespace` | `k8s` 命名空间 |可以与镜像仓库内命名空间不一致|

接下来在配置文件这里指定使用的 `secret` 即可：

```yaml
spec:
  imagePullSecrets:
  - name: ali-image-secret
  containers:
  - name: my-image
    image: registry.cn-hangzhou.aliyuncs.com/my-namespace/my-image:latest
```
