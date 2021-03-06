# Automics

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics)

`Atomics` 对象提供了一组静态方法对 `SharedArrayBuffer` 和 `ArrayBuffer` 对象进行原子操作。

这些原子操作属于 `Atomics` 模块。与一般的全局对象不同， `Atomics` 不是构造函数，因此不能使用 `new` 操作符调用，也不能将其当作函数直接调用。 `Atomics` 的所有属性和方法都是静态的（与 `Math` 对象一样）。

多个共享内存的线程能够同时读写同一位置上的数据。原子操作会确保正在读或写的数据的值是符合预期的，即**下一个原子操作一定会在上一个原子操作结束后才会开始**，其操作过程不会中断。

## 等待和通知

`wait()` 和 `notify()` 方法采用的是 `Linux` 上的 `futexes` 模型（“**快速用户空间互斥量**”），可以让进程一直等待直到某个特定的条件为真，主要用于**实现阻塞**。
