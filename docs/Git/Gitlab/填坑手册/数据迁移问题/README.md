# 数据迁移问题

## 背景

裸机通过 `apt` 安装 `gitlab-ce` 。

## 产生场景

使用命令 `$ sudo gitlab-ctl reconfigure` 更新配置的时候出现了如下错误：

```bash
$ sudo gitlab-ctl reconfigure

rails_migration[gitlab-rails] (gitlab::database_migrations line 51) had an error: Mixlib::ShellOut::ShellCommandFailed: bash[migrate gitlab-rails
 database] (/opt/gitlab/embedded/cookbooks/cache/cookbooks/gitlab/resources/rails_migration.rb line 16) had an error: Mixlib::ShellOut::ShellComm
andFailed: Command execution failed. STDOUT/STDERR suppressed for sensitive resource
```

## 产生原因

似乎是因为存在私密数据？？？

## 解决方案

[参考文章](https://www.reddit.com/r/gitlab/comments/u9yh3z/gitlabctl_reconfigure_failing_due_to_migration/i60ylcc/?utm_source=reddit&utm_medium=web2x&context=3)

首先输入如下命令：

```bash
$ sudo gitlab-rake db:migrate
```

从输出中找到类似如下命令并**切换到bash终端输入**！！！

```bash
$ sudo gitlab-rake gitlab:background_migrations:finalize[ProjectNamespaces::BackfillProjectNamespaces,projects,id,'[null\,"up"]']
```

> [!warning|label: 注意]
> 必须在 `bash` 终端输入这个命令， `zsh` 是无法识别的。
