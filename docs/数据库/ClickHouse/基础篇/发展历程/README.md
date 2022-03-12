# 发展历程

`ClickHouse` 背后的研发团队是来自俄罗斯的 `Yandex` 公司。这是一家俄罗斯本土的互联网企业，于 `2011` 年在纳斯达克上市，他的核心产品是**搜索引擎**。根据最新的数据显示， `Yandex` 占据了本国 `47%` 以上的搜索市场，是现今世界上最大的俄语搜索引擎。 `Google` 是他的直接竞争对手。

> [!tip]
> 大名鼎鼎的 `Nginx` 也是这家公司的产品，其实力毋庸置疑。

总所周知，在线搜索引擎的营收来源非常依赖流量和在线广告业务。所以，通常搜索引擎公司为了更好地帮助自身及用户分析网络流量，都会推出自家的**在线流量分析产品**。例如 `Google` 的 `Google Analytics` 、百度的百度统计。 `Yandex` 也不例外，[Yandex. Metrica](https://metrica.yandex.com)就是这样一款用于在线流量分析的产品。

`ClickHouse` 就是在这样的产品背景下诞生的，伴随着 `Yandex.Metrica` 业务的发展，其底层架构经历了**四个阶段**，一步一步最终形成了大家现在所看到的 `ClickHouse` 。纵观这四个阶段的发展，俨然是数据分析产品形态以及 `OLAP` 架构历史演进的缩影。通过了解这段演进过程，我们能够更透彻地了解 `OLAP` 面对的挑战，以及 `ClickHouse` 能够解决的问题。

`ClickHouse` 的发展历程如下：

|发展历程| `OLAP` 架构| `Yandex. Metrica` 产品形态|
|-----|-----|-----|
|顺理成章的 `MySQL` 时期| `ROLAP` |固定报告|
|另辟蹊径的 `Metrage` 时期| `MOLAP` |固定报告|
|自我突破的 `OLAPServer` 时期| `HOLAP` （ `Metrage` + `OLAPServer` ）|自助报告|
|水到渠成的 `ClickHouse` 时代| `ROLAP` |自助报告|
