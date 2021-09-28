# Ubuntu 20.04 环境下初始化k8s集群

## 集群环境

五台内网互通的服务器，操作系统均为 `Ubuntu 20.04 LTS` ，操作用户为 `ubuntu` ，拥有 `root` 权限。

|服务器名称|内网ip|
|-----|-----|
|node1|192.168.0.104|
|node2|192.168.0.103|
|node3|192.168.0.105|
|node4|192.168.0.108|
|node5|192.168.0.109|

## 前置操作

### 关闭交换(swap)分区

相关操作转至笔记：[Ubuntu20.04关闭交换(swap)分区](../../../../Linux/Ubuntu/基本使用/关闭交换分区.md)

::: tip 提示
**一般云服务都没有开启交换分区**，可以通过 `$ sudo swapon --show` 命令来查看
:::

### 安装Docker

相关操作转至笔记：[Ubuntu20.04安装Docker](../../../Docker/安装/Ubuntu20.04安装.md)

## 安装k8s三大组件

```shell
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

```json {3-8}
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

::: tip 提示
如果没有此文件，可以使用更简便的方式：

```shell
$ mkdir /etc/docker
$ cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

:::

接下来重启docker服务

```shell
$ sudo systemctl restart docker
```