# 禁用Prometheus

修改 `/etc/gitlab/gitlab.rb` 文件，打开 `prometheus_monitoring['enable']` 配置的注释，并设置其为 `false` 。

```ini
prometheus_monitoring['enable'] = false
```

之后重新加载配置，并重启 `gitlab` 即可：

```bash
$ sudo gitlab-ctl reconfigure
$ sudo gitlab-ctl restart
```
