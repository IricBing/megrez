# 遗失 gitlab-secrets.json 文件

## 产生原因

1. 自己删了
1. `gitlab`安装的时候由于网络问题，初始化失败，然后就没有密码文件。。。

## 解决办法

官方文档的解决办法： `https://docs.gitlab.com/ee/raketasks/backup_restore.html#when-the-secrets-file-is-lost`

由于我们的gitlab比较重要，闲暇时间先搞一个服务器备份，之后再作死尝试吧，目前没有测试过。
