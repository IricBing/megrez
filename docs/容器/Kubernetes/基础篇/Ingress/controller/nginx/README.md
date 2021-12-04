# ingress-nginx

> [!warning|label:注意]
> `ingress-nginx` 和 `nginx-ingress` 是两个不同的东东！

## 安装

### 通过Helm安装——推荐

> [!warning|label:前提]
> 必须配置**Docker代理**，请转至笔记[代理配置](../../../../../Docker/安装/代理配置.md)，否则在下载过程中使用了非 `docker hub` 仓库的镜像就下载不了了，这个时候阿里云容器镜像加速器是用不了的。

在 `Github` 仓库中已经详细介绍了如何通过 `Helm` 进行安装了，[地址](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx)

这里最好还是将 `helm` 包下载下来安装，避免了终端走代理，因为**终端走代理会导致集群之间内网通信不通！**

```bash {1, 5}
$ setproxys   # 开启打理
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$ helm repo update
$ helm pull --untar ingress-nginx/ingress-nginx
$ removeproxy  # 关闭代理
$ cd ingress-nginx
$ helm install my-nginx .

```

::: details 点击展开安装日志
```bash
$ helm install my-nginx .
NAME: my-nginx
LAST DEPLOYED: Wed Nov 10 06:26:02 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
The ingress-nginx controller has been installed.
It may take a few minutes for the LoadBalancer IP to be available.
You can watch the status by running 'kubectl --namespace default get services -o wide -w my-nginx-ingress-nginx-controller'

An example Ingress that makes use of the controller:

  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: nginx
    name: example
    namespace: foo
  spec:
    ingressClassName: example-class
    rules:
      - host: www.example.com
        http:
          paths:
            - path: /
              pathType: Prefix
              backend:
                service:
                  name: exampleService
                  port: 80
    # This section is only required if TLS is to be enabled for the Ingress
    tls:
      - hosts:
        - www.example.com
        secretName: example-tls

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls
```

:::

安装完成测试

```bash
$ helm list
NAME    	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART              	APP VERSION
my-nginx	default  	1       	2021-11-10 04:26:26.910214873 +0000 UTC	deployed	ingress-nginx-4.0.6	1.0.4 
```

### 通过kubectl

```bash
$ curl -O https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/baremetal/deploy.yaml
```

> [!warning|label:注意]
> 不要盲目复制命令，注意去 `GitHub` 上看最新的版本。


未完待续……
