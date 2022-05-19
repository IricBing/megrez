# Acme 账户问题

## 背景

裸机通过 `apt` 安装 `gitlab-ce` 。

## 产生场景

通过 `$ sudo apt upgrade` 更新 `gitlab-ce` 版本的时候失败了，让我手动输入 `$ sudo gitlab-ctl reconfigure` ，但是 `reconfigure` 命令出现如下错误：

```bash
$ sudo gitlab-ctl reconfigure

# 省略非关键输出
Running handlers:
There was an error running gitlab-ctl reconfigure:

letsencrypt_certificate[git.9xing.cn] (letsencrypt::http_authorization line 6) had an error: Acme::Client::Error::AccountDoesNotExist: acme_certificate[staging] (/opt/gitlab/embedded/cookbooks/cache/cookbooks/letsencrypt/resources/certificate.rb line 41) had an error: Acme::Client::Error::AccountDoesNotExist: No account exists with the provided key
```

## 产生原因

可以看出是 `Acme` 的账户出了问题，找不到账户了。至于为什么出问题就暂时不研究了，没时间呀~

> [!tip|label: PS]
> 这个是不是就是导致之前我们 `LetsEncrypt` 证书无法自动更新的罪魁祸首？参加笔记：[更新LetsEncrypt证书](../更新LetsEncrypt证书/README.md)

## 解决方案

这个问题应该是普遍问题，在 `StackOverflow` 上一下就找到了：[文章地址](https://stackoverflow.com/questions/70633536/gitlab-ssl-certificate-error-no-account-exists)

输入如下命令：

```bash
$ sudo mv /etc/acme/account_private_key.pem /etc/acme/account_private_key.pem.backup
$ sudo gitlab-ctl reconfigure
```
