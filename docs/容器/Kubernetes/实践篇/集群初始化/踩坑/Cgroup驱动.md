# Cgroup 驱动

查看 `Docker` 的 `Cgroup` 驱动：

```bash
$ docker info | grep -i cgroup
WARNING: No swap limit support
 Cgroup Driver: systemd
 Cgroup Version: 1
```

## 修改kubectl的Cgroup驱动配置

修改 `/var/lib/kubelet/kubeadm-flags.env` 配置文件，在最后加上 `KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"` 。

```bash
$ sudo echo KUBELET_EXTRA_ARGS="--cgroup-driver=systemd" >> /var/lib/kubelet/kubeadm-flags.env
```
