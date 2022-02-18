# 卸载

> [!tip|label: 安装环境]
> `Ubuntu 20.04` 使用 `apt` 安装的。

```bash
$ sudo apt purge kubelet kubeadm kubectl
$ sudo apt autoremove
$ sudo rm -r /etc/kubernetes
```
