# 日志

> [!tip|label: 提示]
> 参考网址：https://blog.csdn.net/douglas8287/article/details/84880261

## 查看日志

```bash
# 查看所有的logs; 按 Ctrl-C 退出
$ sudo gitlab-ctl tail
 
# 拉取/var/log/gitlab下子目录的日志
$ sudo gitlab-ctl tail gitlab-rails
 
# 拉取某个指定的日志文件
$ sudo gitlab-ctl tail nginx/gitlab_error.log
```
