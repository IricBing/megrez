# 卸载

> [!tip|label: 安装环境]
> `Ubuntu 20.04` 使用 `apt` 安装的。

```bash
$ sudo kubeadm reset -f && \
sudo rm -rvf $HOME/.kube && \
sudo rm -rvf ~/.kube/ && \
sudo rm -rvf /etc/kubernetes/ && \
sudo rm -rvf /etc/systemd/system/kubelet.service.d && \
sudo rm -rvf /etc/systemd/system/kubelet.service && \
sudo rm -rvf /usr/bin/kube* && \
sudo rm -rvf /etc/cni && \
sudo rm -rvf /opt/cni && \
sudo rm -rvf /var/lib/etcd && \
sudo rm -rvf /var/etcd && \
sudo apt-get remove kube* 
```

> [!tip]
> 上述命令执行完最后会说 `opt` 目录非空，不可删除，因为里面还有 `containerd` ，目前还不了解这个东西。
