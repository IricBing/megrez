# Block 与 Block 流

`ClickHouse` 内部的数据操作是面向 `Block` 对象进行的，并且采用了**流**的形式。虽然 `Column` 和 `Field` 组成了数据的**基本映射单元**，但对应到实际操作，他们还缺少了一些必要的信息，比如数据的类型及列的名称。于是 `ClickHouse` 设计了 `Block` 对象， `Block` 对象可以看做数据表的子集。 `Block` 对象的本质是由**数据对象**、**数据类型**和**列名称**组成的**三元组**。即 `Column` 、 `DataType` 和**列名称字符串**。 `Column` 提供了数据的读取能力，而 `DataType` 知道如何正反序列化，所以 `Block` 在这些对象的基础之上实现了进一步的抽象和封装，从而简化了整个使用过程，仅通过 `Block` 对象就能完成一系列的数据操作。在具体的实现过程中， `Block` 并没有直接聚合 `Column` 和 `DataType` 对象，而是通过 `ColumnWithTypeAndName` 对象进行间接调用。

有了 `Block` 对象这一层封装之后，对 `Block` 流的设计就是水到渠成的事情了。流操作有两组顶层接口： `IBlockInputStream` 负责数据的读取和关系运算， `IBlockOutputStream` 负责将数据输出到下一环节。 `Block` 流也使用了**泛化**的设计模式，对数据的各种操作最终都会转换成其中一种流的实现。 `IBlockInputStream` 接口定义了读取数据的若干个 `read` **虚方法**，而具体的实现逻辑则交由它的实现类来填充。

`IBlockInputStream` 接口总共有 `60` 多个实现类，他们涵盖了 `ClickHouse` 数据摄取的方方面面。这些实现类大致可以分为三类：第一类用于处理数据定义的 `DDL` 操作，例如 `DDLQueryStatusInputStream` 等；第二类用于处理**关系运算**的相关操作，例如 `LimitBlockInputStream` 、 `JoinBlockInputStream` 及 `AggregatingBlockInputStream` 等；第三类则是与**表引擎**呼应，每一种表引擎都拥有与之对应的 `BlockInputStream` 实现，例如 `MergeTreeBaseSelectBlockInputStream` （ `MergeTree` 表引擎）、 `TinyLogBlockInputStream` （ `TinyLog` 表引擎）及 `KafkaBlockInputStream` （ `Kafka` 表引擎）等。

`IBlockOutputStream` 的设计与 `IBlockInputStream` 如出一辙。 `IBlockOutputStream` 接口同样也定义了若干写入数据的 `write` **虚方法**。它的实现类比 `IBlockInputStream` 要少许多，一共只有 `20` 多种。这些实现类基本用于表引擎的相关处理，负责将数据写入下一环节或者最终目的地，例如 `MergeTreeBlockOutputStream` 、 `TinyLogBlockOutputStream` 及 `StorageFileBlockOutputStream` 等。
