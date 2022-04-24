# 数据查询

作为一款 `OLAP` 分析性数据库，我相信大家在大部分时间内都在使用它的查询功能。在日常运转的过程中，数据查询也是 `ClickHouse` 的主要工作之一。 `ClickHouse` 完全使用 `SQL` 作为查询语言，能够以 `SELECT` 查询语句的形式从数据库中选取数据，这也是它具备流行潜质的重要原因。虽然 `ClickHouse` 拥有优秀的查询性能，但是我们也不能滥用查询，掌握 `ClickHouse` 所支持的各种子查询，并选择合理的查询形式是很有必要的。使用不恰当的 `SQL` 语句进行查询不仅会带来低性能，还可能导致不可预知的系统错误。

在绝大部分场景中，都应该避免使用 `SELECT *` 形式来查询数据，因为通配符 `*` 对于采用列式存储的 `ClickHouse` 而言**没有任何好处**。假如面对一张拥有数百个列字段的数据表，下面这两条 `SELECT` 语句的性能可能会相差 `100` 倍之多。

```sql
-- 使用通配符*与按列按需查询相比，性能可能相差100倍。
$ SELECT * FROM datasets.hits_v1;
$ SELECT WatchID FROM datasets.hits_v1;
```

`ClickHouse` 对于 `SQL` 语句的解析是**大小写敏感**的，这意味着 `SELECT a` 和 `SELECT A` 表示的语义是不相同的。 `ClickHouse` 目前支持的查询子句如下所示：

```sql
[WITH expr | (subquery)]
SELECT [DISTINCT] expr
[FROM [db.]table | (subquery) | table_function] [FINAL]
[SAMPLE expr]
[[LEFT] ARRAY JOIN]
[GLOBAL] [ALL|ANY|ASOF] [INNER | CROSS | [LEFT|RIGHT|FULL [OUTER]]] JOIN (subquery)|table ON|USING columns_list
[PREWHERE expr]
[WHERE expr]
[GROUP BY expr] [WITH ROLLUP|CUBE|TOTALS]
[HAVING expr]
[ORDER BY expr]
[LIMIT [n[,m]]]
[UNION ALL]
[INTO OUTFILE filename]
[FORMAT format]
[LIMIT [offset] n BY columns]
```

其中，方括号包裹的查询子句表示其为**可选项**，所以只有 `SELECT` 子句是必须的，而 `ClickHouse` 对于查询语法的解析也大致是按照上面各个子句排列的顺序进行的。
