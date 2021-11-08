# ingress-nginx

::: warning 注意
`ingress-nginx` 和 `nginx-ingress` 是两个不同的东东！
:::

## 安装

### 通过Helm安装

在 `Github` 仓库中已经详细介绍了如何通过 `Helm` 进行安装了，[地址](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx)

**但是！走了外网，下载不下来！**这里也就不详细介绍了。

::: tip 遗憾
尝试了各种方式也没有解决这个墙的问题，包括后面的 `kubectl` 安装方式也是生生修改了配置文件，没有做到无侵入。
:::

### 通过kubectl

```shell
$ curl -O https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/baremetal/deploy.yaml
```

::: warning 注意
不要盲目复制命令，注意去 `GitHub` 上看最新的版本。
:::

