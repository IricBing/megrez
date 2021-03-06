# 多线程与分布式

`ClickHouse` 几乎具备现代化高性能数据库的所有典型特征，对于可以提升性能的手段可谓是一一用尽，对于多线程和分布式这类被广泛使用的技术，自然更是不在话下。

如果说向量化执行是通过**数据级**并行的方式提升了性能，那么多线程处理就是通过**线程级**并行的方式实现了性能的提升。相比基于底层硬件实现的向量化执行 `SIMD` ，线程级并行通常由更高层次的软件层面控制。现代计算机系统早已普及了多处理器架构，所以现今市面上的服务器都具备良好的多核心多线程处理能力。由于 `SIMD` 不适合用于带有较多分支判断的场景， `ClickHouse` 也大量使用了多线程技术以实现提速，以此和向量化执行形成互补。

如果一个篮子装不下所有的鸡蛋，那么就多用几个篮子来装，这就是分布式设计中**分而治之**的基本思想。同理，如果一台服务器性能吃紧，那么就利用多台服务的资源协同处理。为了实现这一目标，首先需要在数据层面实现数据的分布式。因为在分布式领域，存在一条金科玉律——**计算移动比数据移动更加划算**。在各服务器之间，通过网络传输数据的成本是高昂的，所以相比移动数据，更为聪明的做法是预先将数据分布到各台服务器，将数据的计算查询直接下推到数据所在的服务器。 `ClickHouse` 在数据存取方面，既支持**分区** (纵向扩展，利用多线程原理)，也支持**分片** (横向扩展，利用分布式原理)，可以说是将多线程和分布式的技术应用到了极致。
