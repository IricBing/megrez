# 内存占用过高

参考文章： `https://blog.csdn.net/ouyang_peng/article/details/84066417`

> [!tip|label: 提示]
> 这篇文章中有些 `worker` 配置现在 `gitlab` 配置好像找不到。。。

参考文章2：`https://developer.aliyun.com/article/760745`

```ini
postgresql['shared_buffers'] //减少数据库缓存(默认为256MB 改为128MB)

postgresql['max_worker_processes'] //减少数据库并发数(默认为8 改为4）
```

> [!tip|label: 提示]
> 这篇文章中的 `sidekiq['concurrency']` 字段现在找不到。。。
