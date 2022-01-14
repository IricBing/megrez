# Electron 版本说明

`Electron` 的版本发布非常快，通常几个月就是一个版本，一年能有四五个版本。 `Electron` 的版本严格按照语义化版本来发布，支持 `-beta` 和 `-alpha` 标志。

为什么会有这么多版本？作者发布的不累吗？

这个东西可不能怪作者，因为 `Electron` 的本质是将 `nodejs` 和 `Chrome` 内核打包成一个新东西，也就是说： `Electron = NodeJS + Chromium` 。这下可就麻烦了， `Chrome` 的版本都已经过百了， `NodeJS` 也不用说，一年一个 `LTS` ，还有一个作死版本， `LTS` 还分为转正和未转正的， `Electron` 的版本能维护到这样已经不错了。。。

`Electron` 版本的发布时间线请参考：[官方文档](https://www.electronjs.org/docs/latest/tutorial/electron-timelines)

> [!tip]
> 关于 `NodeJS` 版本的差异可以参考网站：https://node.green/
