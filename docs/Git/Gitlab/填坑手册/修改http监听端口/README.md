# 修改http监听端口

gitlab安装的时候默认是占用了443和80端口的，并且自动集成了letsencrypt证书续期，对于服务器只跑gitlab的场景来说是非常完美的，基本上一次安装就不用管了。但是对于一个服务器跑多个服务，并且还要使用443和80的情况下，这就成了弊端了，在这种场景下，gitlab服务就不能占用80和443了，把80和443让出来给Nginx来使用，并通过在Nginx中设置反向代理的方式来访问gitlab。

## 修改配置

找到`/etc/gitlab/gitlab.rb`文件，修改其中配置：

```nginx
nginx['listen_addresses'] = ['*']
nginx['listen_port'] = 82
```

保存退出。

## 重启gitlab

```bash
$ sudo gitlab-ctl restart
```