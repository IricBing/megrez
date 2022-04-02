# Parser 与 Interpreter

`Parser` 和 `Interpreter` 是非常重要的两组接口： `Parser` 分析器负责创建 `AST` 对象；而 `Interpreter` 解释器则负责解释 `AST` ，并进一步创建查询的执行管道。他们与 `IStorage` 一起，串联成了整个数据查询的过程。 `Parser` 分析器可以将一条 `SQL` 语句以递归下降的方法解析成 `AST` 语法树的形式。不同的 `SQL` 语句，会经由不同的 `Parser` 实现类解析。例如，有负责解析 `DDL` 查询语句的 `ParserRenameQuery` 、 `ParserDropQuery` 和 `ParserAlterQuery` 解析器，也有负责解析 `INSERT` 语句的 `ParserInsertQuery` 解析器，还有负责 `SELECT` 语句的 `ParserSelectQuery` 。

`Interpreter` 解析器的作用就像 `Service` 服务层一样，起到串联整个查询过程的作用，它会根据解析器的类型，聚合它所需要的资源。首先它会解析 `AST` 对象；然后执行“**业务逻辑**”（例如分支判断、设置参数、调用接口等）；最终返回 `IBlock` 对象，以**线程**的形式建立起一个查询执行**管道**。
