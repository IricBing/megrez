# 查看版本信息

```bash
$ sudo gitlab-rake gitlab:env:info

System information
System:		Ubuntu 18.04
Current User:	git
Using RVM:	no
Ruby Version:	2.7.5p203
Gem Version:	3.1.4
Bundler Version:2.2.33
Rake Version:	13.0.6
Redis Version:	6.2.6
Sidekiq Version:6.4.0
Go Version:	unknown

GitLab information
Version:	14.10.2
Revision:	07d12f3fd11
Directory:	/opt/gitlab/embedded/service/gitlab-rails
DB Adapter:	PostgreSQL
DB Version:	12.7
URL:		https://git.9xing.cn
HTTP Clone URL:	https://git.9xing.cn/some-group/some-project.git
SSH Clone URL:	git@git.9xing.cn:some-group/some-project.git
Using LDAP:	no
Using Omniauth:	yes
Omniauth Providers: 

GitLab Shell
Version:	13.25.1
Repository storage paths:
- default: 	/var/opt/gitlab/git-data/repositories
GitLab Shell path:		/opt/gitlab/embedded/service/gitlab-shell
```

> [!tip|label:提示]
> 这个命令很耗时，耐心等候