# 数据分片与分布式查询

**数据分片**是将数据进行横向切分，这是一种在面对海量数据的场景下，解决存储和查询瓶颈的有效手段，是一种**分治**思想的体现。 `ClickHouse` 支持分片，而分片则依赖集群。每个集群由 `1` 到多个分片组成，而每个分片则对应了 `ClickHouse` 的 `1` 个服务节点。**分片的数量上限取决于节点数量** ( `1` 个分片只能对应 `1` 个服务节点)。

`ClickHouse` 并不像其他分布式系统那样，拥有高度自动化的分片功能。 `ClickHouse` 提供了**本地表** ( `Local Table` ) 与**分布式表** ( `Distributed Table` ) 的概念。一张本地表等同于一份数据的分片。而分布式表本身不存储任何数据，它是本地表的访问代理，其作用类似分库中间件。借助分布式表，能够代理访问多个数据分片，从而实现分布式查询。

这种设计类似数据库的**分库**和**分表**，十分灵活。例如在业务系统上线的初期，数据体量并不高，此时数据表并不需要多个分片。所以使用单个节点的本地表 (单个数据分片) 即可满足业务需求，待到业务增长、数据量增大的时候，再通过新增数据分片的方式分流数据，并通过分布式表实现分布式查询。这就好比一辆手动挡赛车，它将所有的选择权都交到了使用者的手中。
