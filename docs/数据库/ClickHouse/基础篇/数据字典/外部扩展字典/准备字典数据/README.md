# 准备字典数据

下载测试数据文件：

* <a href="数据库/ClickHouse/基础篇/数据字典/外部扩展字典/准备字典数据/assets/files/organization.csv" download="organization.csv">organization.csv</a>
* <a href="数据库/ClickHouse/基础篇/数据字典/外部扩展字典/准备字典数据/assets/files/sales.csv" download="sales.csv">sales.csv</a>
* <a href="数据库/ClickHouse/基础篇/数据字典/外部扩展字典/准备字典数据/assets/files/asn.csv" download="asn.csv">asn.csv</a>

## organization.csv

`organization.csv` 是一份企业组织数据，它将用于 `flat` 、 `hashed` 、 `cache` 、 `complex_key_hashed` 和 `complex_key_cache` 字典的演示场景。这份数据有 `id` 、 `code` 和 `name` 三个字段，数据格式如下所示：

```csv
1,"a0001","研发部"
2,"a0002","产品部"
3,"a0003","数据部"
4,"a0004","测试部"
5,"a0005","运维部"
6,"a0006","规划部"
7,"a0007","市场部"
```

## sales.csv

`sales.csv` 是销售数据，它将用于 `range_hashed` 字典的演示场景。这份数据拥有 `id` 、 `start` 、 `end` 和 `price` 四个字段，数据格式如下所示：

```csv
1,2016-01-01,2017-01-10,100
2,2016-05-01,2017-07-01,200
3,2014-03-05,2018-01-20,300
4,2018-08-01,2019-10-01,400
5,2017-03-01,2017-06-01,500
6,2017-04-09,2018-05-30,600
7,2018-06-01,2019-01-25,700
8,2019-08-01,2019-12-12,800
```

## asn.csv

`asn.csv` 是 `asn` 数据，它将用于演示 `ip_trie` 字典的场景。这份数据拥有 `ip` 、 `asn` 和 `country` 三个字段，数据格式如下所示：

```csv
"82.118.230.0/24","AS42831","GB"
"148.163.0.0/17","AS53755","US"
"178.93.0.0/18","AS6849","UA"
"200.69.95.0/24","AS262186","CO"
"154.9.160.0/20","AS174","US"
```
