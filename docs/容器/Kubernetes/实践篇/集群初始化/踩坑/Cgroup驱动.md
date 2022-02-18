# Cgroup 驱动

查看 `Docker` 的 `Cgroup` 驱动：

```bash
$ docker info | grep -i cgroup
WARNING: No swap limit support
 Cgroup Driver: systemd
 Cgroup Version: 1
```

## 修改kubelet的Cgroup驱动配置

```bash
$ sudo cat /var/lib/kubelet/kubeadm-flags.env

$ sudo cat /var/lib/kubelet/config.yaml
```
