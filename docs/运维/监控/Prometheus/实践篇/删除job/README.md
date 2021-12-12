# 删除job

笔记未完成

```bash
$ curl -X POST -g 'http://127.0.0.1:9090/api/v1/admin/tsdb/delete_series?match[]={__name__=~".+"}&match[]={job="linux"}'

# delete alerts series
$ curl -g -XPOST 'http://prometheus:9090/api/v2/admin/tsdb/delete_series?match[]=linux'

# delete data from disk
$ curl -XPOST http://prometheus:9090/api/v2/admin/tsdb/clean_tombstones
```