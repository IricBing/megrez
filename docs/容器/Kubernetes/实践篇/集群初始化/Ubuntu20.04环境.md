# Ubuntu 20.04 环境下初始化k8s集群

## 集群环境

五台内网互通的服务器，操作系统均为 `Ubuntu 20.04 LTS` ，操作用户为 `ubuntu` ，拥有 `root` 权限。

|服务器名称|内网ip|
|-----|-----|
|node1|192.168.31.51|
|node2|192.168.31.52|
|node3|192.168.31.53|
|node4|192.168.31.54|
|node5|192.168.31.55|

## 前置操作

### 关闭交换(swap)分区

相关操作转至笔记：[Ubuntu20.04关闭交换(swap)分区](../../../../Linux/Ubuntu/基本使用/关闭交换分区.md)

> [!tip|label:提示]
> **一般云服务都没有开启交换分区**，可以通过 `$ sudo swapon --show` 命令来查看


### 安装Docker

相关操作转至笔记：[Ubuntu20.04安装Docker](../../../Docker/安装/Ubuntu20.04安装.md)

## 安装k8s三大组件

```bash
$ sudo apt install software-properties-common

# 添加并信任APT证书
$ curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -

# 添加源地址
$ sudo add-apt-repository "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main"

# 更新源并安装最新版 kubenetes 三大组件
$ sudo apt update && sudo apt install kubelet kubeadm kubectl

# 验证是否安装成功
$ kubeadm version
$ kubectl version
$ kubelet --version
```

## 配置 docker 守护程序

修改 `/etc/docker/daemon.json` 文件，如果按照前置操作来做了，在安装 `docker` 的时候已经写了这个文件，并且添加了国内镜像源，将文件内容更改为如下即可：

```json
{
  "registry-mirrors": ["https://7ske187f.mirror.aliyuncs.com"], 
  "exec-opts": ["native.cgroupdriver=systemd"], 
  "log-driver": "json-file", 
  "log-opts": {

    "max-size": "100m"

  }, 
  "storage-driver": "overlay2"
}
```

> [!tip|label:提示]
> 如果没有此文件，可以使用更简便的方式：
> ```bash
> $ mkdir /etc/docker
> $ cat <<EOF | sudo tee /etc/docker/daemon.json
> {
>   "exec-opts": ["native.cgroupdriver=systemd"],
>   "log-driver": "json-file",
>   "log-opts": {
>     "max-size": "100m"
>   },
>   "storage-driver": "overlay2"
> }
> EOF
> ```


接下来重启 `docker` 服务

```bash
$ sudo systemctl restart docker
```

## 初始化控制平面节点

选定 `master` 节点，这里选择 `node1` 作为 `master` 节点，在此节点上运行如下命令：

```bash
$ sudo kubeadm init --apiserver-advertise-address 192.168.31.51 --pod-network-cidr 10.244.0.0/16 --image-repository gotok8s --config kubeadm-config.yaml --v=5
```

> [!tip|label:提示]
> `192.168.31.51` 为 `node1` 的 `内网IP`
> 
> `--pod-network-cidr 10.244.0.0/16` 参数与后续 `CNI` 插件有关，这里以 `flannel` 为例，若后续部署其他类型的网络插件请更改此参数。


> [!note|label:成功输出]
> ```txt
> [init] Using Kubernetes version: v1.22.2
> [preflight] Running pre-flight checks
> [preflight] Pulling images required for setting up a Kubernetes cluster
> [preflight] This might take a minute or two, depending on the speed of your internet connection
> [preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
> [certs] Using certificateDir folder "/etc/kubernetes/pki"
> [certs] Generating "ca" certificate and key
> [certs] Generating "apiserver" certificate and key
> [certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local node1] and IPs [10.96.0.1 192.168.0.51]
> [certs] Generating "apiserver-kubelet-client" certificate and key
> [certs] Generating "front-proxy-ca" certificate and key
> [certs] Generating "front-proxy-client" certificate and key
> [certs] Generating "etcd/ca" certificate and key
> [certs] Generating "etcd/server" certificate and key
> [certs] etcd/server serving cert is signed for DNS names [localhost node1] and IPs [192.168.0.51 127.0.0.1 ::1]
> [certs] Generating "etcd/peer" certificate and key
> [certs] etcd/peer serving cert is signed for DNS names [localhost node1] and IPs [192.168.0.51 127.0.0.1 ::1]
> [certs] Generating "etcd/healthcheck-client" certificate and key
> [certs] Generating "apiserver-etcd-client" certificate and key
> [certs] Generating "sa" key and public key
> [kubeconfig] Using kubeconfig folder "/etc/kubernetes"
> [kubeconfig] Writing "admin.conf" kubeconfig file
> [kubeconfig] Writing "kubelet.conf" kubeconfig file
> [kubeconfig] Writing "controller-manager.conf" kubeconfig file
> [kubeconfig] Writing "scheduler.conf" kubeconfig file
> [kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
> [kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
> [kubelet-start] Starting the kubelet
> [control-plane] Using manifest folder "/etc/kubernetes/manifests"
> [control-plane] Creating static Pod manifest for "kube-apiserver"
> [control-plane] Creating static Pod manifest for "kube-controller-manager"
> [control-plane] Creating static Pod manifest for "kube-scheduler"
> [etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
> [wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
> [apiclient] All control plane components are healthy after 9.004106 seconds
> [upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
> [kubelet] Creating a ConfigMap "kubelet-config-1.22" in namespace kube-system with the configuration for the kubelets in the cluster
> [upload-certs] Skipping phase. Please see --upload-certs
> [mark-control-plane] Marking the node node1 as control-plane by adding the labels: [node-role.kubernetes.io/master(deprecated) node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
> [mark-control-plane] Marking the node node1 as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
> [bootstrap-token] Using token: 0d3ks2.7pl8cg6uxpk9qbl6
> [bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
> [bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
> [bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
> [bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
> [bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
> [bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
> [kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
> [addons] Applied essential addon: CoreDNS
> [addons] Applied essential addon: kube-proxy
> 
> Your Kubernetes control-plane has initialized successfully!
> 
> To start using your cluster, you need to run the following as a regular user:
> 
>   mkdir -p $HOME/.kube
>   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
>   sudo chown $(id -u):$(id -g) $HOME/.kube/config
> 
> Alternatively, if you are the root user, you can run:
> 
>   export KUBECONFIG=/etc/kubernetes/admin.conf
> 
> You should now deploy a pod network to the cluster.
> Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
>   https://kubernetes.io/docs/concepts/cluster-administration/addons/
> 
> Then you can join any number of worker nodes by running the following on each as root:
> 
> kubeadm join 192.168.0.51:6443 --token 0d3ks2.7pl8cg6uxpk9qbl6 \
> 	--discovery-token-ca-cert-hash sha256:46e0acce2cc6f64e0853bcb0e343a8594ebf2fc34e29eb8440b458654f98560a 
> ```

根据提示，作为**非root**用户，需要执行以下操作来完成环境配置：

```bash
$ mkdir -p $HOME/.kube
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

对于**root**用户，需要将配置写到终端配置文件中，如下所示：

* zsh

```bash
echo "export KUBECONFIG=/etc/kubernetes/admin.conf" >> ~/.zshrc
source ~/.zshrc
```

* bash

```bash
echo "export KUBECONFIG=/etc/kubernetes/admin.conf" >> ~/.bashrc
source ~/.bashrc
```

## 部署 CNI

使用 `kubectl` 部署 `flannel` 。

```bash
$ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

因为从 `raw.githubusercontent.com` 上下载了文件，可能下载不下来，同时，这个配置文件中的 `quay.io` 镜像是 `RedHat` 在维护，可能下载缓慢，我们采用下载 `kube-flannel.yml` 文件并手动将里面的 `quay.io` 镜像替换成 `docker` 镜像的方式来安装，替换示例：

```git
$ diff kube-flannel.yml kube-flannel-changed.yml

169c169
<         image: quay.io/coreos/flannel:v0.14.0
---
>         image: xwjh/flannel:v0.14.0
183c183
<         image: quay.io/coreos/flannel:v0.14.0
---
>         image: xwjh/flannel:v0.14.0
```

安装命令：

```bash
$ kubectl apply -f kube-flannel.yml
Warning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+
podsecuritypolicy.policy/psp.flannel.unprivileged created
clusterrole.rbac.authorization.k8s.io/flannel created
clusterrolebinding.rbac.authorization.k8s.io/flannel created
serviceaccount/flannel created
configmap/kube-flannel-cfg created
daemonset.apps/kube-flannel-ds created
```

安装完成后检查一下状态：

```bash
$ kubectl get nodes
NAME    STATUS   ROLES                  AGE     VERSION
node1   Ready    control-plane,master   3h43m   v1.22.2

$ kubectl get pods -A
NAMESPACE     NAME                            READY   STATUS    RESTARTS   AGE
kube-system   coredns-8dfdb9bf6-9vv8s         1/1     Running   0          3h43m
kube-system   coredns-8dfdb9bf6-tjrtf         1/1     Running   0          3h43m
kube-system   etcd-node1                      1/1     Running   0          3h43m
kube-system   kube-apiserver-node1            1/1     Running   0          3h43m
kube-system   kube-controller-manager-node1   1/1     Running   0          3h43m
kube-system   kube-flannel-ds-hkgbx           1/1     Running   0          5m24s
kube-system   kube-proxy-4lzzl                1/1     Running   0          3h43m
kube-system   kube-scheduler-node1            1/1     Running   0          3h43m
```

> [!tip|label:提示]
> `node Status` 从 `NotReady` 到 `Ready` 要等待一段时间，这里的时间长短与**docker镜像**下载速度有关，因此我们才会在上一步的时候修改 `RedHat` 维护的地址到 `Docker` 地址。


## 允许控制节点调度Pod（可选）

**默认**情况下，控制节点不会部署 `Pod` 。出于安全原因，集群不会在**控制平面**节点上调度 `Pod` 。 如果你希望能够在控制平面节点上调度 `Pod` ， 例如用于开发的单机 `Kubernetes` 集群，可以用如下命令取消这个限制：

```bash
$ kubectl taint nodes --all node-role.kubernetes.io/master-
node "test-01" untainted
```

> [!tip|label:提示]
> 这将从任何拥有 `node-role.kubernetes.io/master`  `taint` 标记的节点中移除该标记， 包括控制平面节点，这意味着调度程序将能够在**任何地方**调度 `Pods` 。


## 加入节点

加入节点的时候和 `Docker Swarm` 一样，都是需要 `Token` 才能加入的，在初始化管理节点的时候，就会提示加入节点的命令，如下所示：

```txt
Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 172.22.108.36:6443 --token tokenstring... \
    --discovery-token-ca-cert-hash sha256:... 
```

> [!tip|label:提示]
> `Token string` 和 `sha256 string` 是对应的 `token` 和 `cert-hash` ，初始化时会自动生成。也可以手动生成。


在 `node2` 节点上执行加入集群命令：

```bash
$ sudo kubeadm join 192.168.0.51:6443 --token 0d3ks2.7pl8cg6uxpk9qbl6 \
        --discovery-token-ca-cert-hash sha256:46e0acce2cc6f64e0853bcb0e343a8594ebf2fc34e29eb8440b458654f98560a
[sudo] password for ubuntu: 
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
```

按照提示，我们去 `node1` 节点查看状态：

```bash
$ kubectl get nodes
NAME    STATUS     ROLES                  AGE    VERSION
node1   Ready      control-plane,master   4h4m   v1.22.2
node2   NotReady   <none>                 25s    v1.22.2
```

在 `node3` 、 `node4` 、 `node5` 上也执行相同的加入集群的操作。之后再去node1节点上查看状态就会得到如下所示输出：

```bash
$ kubectl get nodes
NAME    STATUS     ROLES                  AGE     VERSION
node1   Ready      control-plane,master   4h9m    v1.22.2
node2   Ready      <none>                 5m17s   v1.22.2
node3   Ready      <none>                 2m10s   v1.22.2
node4   Ready      <none>                 93s     v1.22.2
node5   NotReady   <none>                 65s     v1.22.2
```

### 删除节点方法

在 `master` 节点执行如下命令：

```bash
kubectl delete node <node name>
```

## 测试集群

采用 `nginx` 来测试集群，在 `master` 节点上依次执行如下命令：

```bash {11}
$ kubectl create deployment nginx --image=nginx

$ kubectl expose deployment nginx --port=80 --type=NodePort

$ kubectl get pod, svc
NAME                         READY   STATUS    RESTARTS   AGE
pod/nginx-6799fc88d8-nq5f2   1/1     Running   0          68s

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        4h51m
service/nginx        NodePort    10.103.5.66   <none>        80:32155/TCP   60s

```

注意上述代码中的高亮行，使用`curl`访问`32155`端口，即可得到`nginx`服务的返回，如下所示：

```bash
$  curl 127.0.0.1:32155
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

> [!tip|label:提示]
> `32155` 端口是**自动分配**的端口（也可以手动指定）， `NodePort` 端口范围在 `[30000, 32767]` 。


### 删除测试配置

```bash
$ kubectl delete deployment nginx

$ kubectl delete service nginx
```
