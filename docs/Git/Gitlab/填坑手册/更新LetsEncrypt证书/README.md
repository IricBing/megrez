# 更新 LetsEncrypt 证书

## 场景

`LetsEncrypt` 可以自动续期，突然有一天自动续期不好使了，

## 解决方案

### 手动续期

根据[官方文档](https://docs.gitlab.com/omnibus/settings/ssl.html#manual-lets-encrypt-renewal)手动执行证书续期后发现出现了 `bug` 。

```bash
$ sudo gitlab-ctl renew-le-certs
Traceback (most recent call last):
	7: from /opt/gitlab/embedded/bin/omnibus-ctl:23:in `<main>'
	6: from /opt/gitlab/embedded/bin/omnibus-ctl:23:in `load'
	5: from /opt/gitlab/embedded/lib/ruby/gems/2.7.0/gems/omnibus-ctl-0.6.0/bin/omnibus-ctl:31:in `<top (required)>'
	4: from /opt/gitlab/embedded/lib/ruby/gems/2.7.0/gems/omnibus-ctl-0.6.0/lib/omnibus-ctl.rb:746:in `run'
	3: from /opt/gitlab/embedded/lib/ruby/gems/2.7.0/gems/omnibus-ctl-0.6.0/lib/omnibus-ctl.rb:204:in `block in add_command_under_category'
	2: from /opt/gitlab/embedded/service/omnibus-ctl/letsencrypt.rb:21:in `block in load_file'
	1: from /opt/gitlab/embedded/service/omnibus-ctl/lib/gitlab_ctl/util.rb:62:in `get_node_attributes'
/opt/gitlab/embedded/service/omnibus-ctl/lib/gitlab_ctl/util.rb:47:in `parse_json_file': Attributes not found in /opt/gitlab/embedded/nodes/hecs-210984.json, has reconfigure been run yet? (GitlabCtl::Errors::NodeError)
```

由于时间紧迫，这个报错信息看不太明白，不要纠结了，手动生成证书并替换吧。

### 证书替换

首先查看一下证书所在位置：

```bash
$ sudo cat /var/opt/gitlab/nginx/conf/gitlab-http.conf | grep ssl_certificate
  ssl_certificate /etc/gitlab/ssl/git.xxx.cn.crt;
  ssl_certificate_key /etc/gitlab/ssl/git.xxx.cn.key;
```

可以看到证书的存放位置为： `/etc/gitlab/ssl/` 目录，将手动生成的公钥和私钥文件上传到这里，并修改为同名后重启服务：

```bash
$ sudo gitlab-ctl restart
ok: run: crond: (pid 25546) 0s
ok: run: gitaly: (pid 25553) 0s
ok: run: gitlab-workhorse: (pid 25555) 1s
ok: run: logrotate: (pid 25574) 0s
ok: run: nginx: (pid 25585) 0s
ok: run: postgresql: (pid 25596) 0s
ok: run: puma: (pid 25611) 0s
ok: run: redis: (pid 25616) 0s
ok: run: registry: (pid 25628) 1s
ok: run: sidekiq: (pid 25644) 0s
```
