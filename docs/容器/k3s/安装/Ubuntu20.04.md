# Ubuntu 20.04 安装

## 脚本安装

[官方文档](https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9)

安装命令：

```bash
$ curl -sfL https://get.k3s.io | sh -

# 国内用户
$ curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
```

安装日志：

```bash
$ curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
[INFO]  Finding release for channel stable
[INFO]  Using v1.21.5+k3s2 as release
[INFO]  Downloading hash http://rancher-mirror.cnrancher.com/k3s/v1.21.5-k3s2/sha256sum-amd64.txt
[INFO]  Downloading binary http://rancher-mirror.cnrancher.com/k3s/v1.21.5-k3s2/k3s
[INFO]  Verifying binary download
[INFO]  Installing k3s to /usr/local/bin/k3s
[INFO]  Creating /usr/local/bin/kubectl symlink to k3s
[INFO]  Creating /usr/local/bin/crictl symlink to k3s
[INFO]  Skipping /usr/local/bin/ctr symlink to k3s, command exists in PATH at /usr/bin/ctr
[INFO]  Creating killall script /usr/local/bin/k3s-killall.sh
[INFO]  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
[INFO]  env: Creating environment file /etc/systemd/system/k3s.service.env
[INFO]  systemd: Creating service file /etc/systemd/system/k3s.service
[INFO]  systemd: Enabling k3s unit
[INFO]  systemd: Starting k3s
```

安装完成验证：

```bash
$ sudo k3s kubectl get node
NAME           STATUS   ROLES                  AGE    VERSION
iric-ms-7b89   Ready    control-plane,master   114s   v1.21.5+k3s2
```

## 二进制安装

[官方文档](https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BB%8E%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9)

## 卸载

### server 节点

```bash
$ sudo sh /usr/local/bin/k3s-uninstall.sh
```

### agent 节点

```bash
$ sudo sh /usr/local/bin/k3s-agent-uninstall.sh
```
