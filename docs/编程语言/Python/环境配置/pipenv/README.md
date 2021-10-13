# Python pipenv 篇

::: details 不要让我的心情影响到你
不吐不行，心里咽不下这口气。现在这个社会到处鼓吹 `Python` ，说什么 `Python` 在人工智能，大数据，Excel，计算机科学等等领域多么多么牛逼。是，语法简单，这个没什么不好承认的。但是在工程上要讲结构化、工程化，哪家的工程仅仅是一行**Hello World**？甚至还有真正的工程有人就甩一个 `main.py` 文件过来，一运行，这个包没有，那个包找不到。我是干后台的，我就不信 `Python` 工程能够烂到这样，这样的工程别说其他的了，扔到垃圾篓中都嫌占地方。

因为知道 `Python` 工程肯定不是这样的，就去互联网上找成熟的工程解决方案，我勒个去，这个就是大家鼓吹的 `Python` ？从 `virtualenv` 到 `conda` ，从 `conda` 到 `pipenv` ， `python2.x` 和 `python3.x` 混用，这叫工程？搞笑呢吧。

当然，吐槽归吐槽，这个生态恶心是恶心，但是还得碰啊。反正我内心是非常抵触这种被人吹得天花乱坠，实际一看屎一坨的东西。说出来心里好多了，言归正传。
:::

`Pipenv` 是 `Pipfile` 主要倡导者、 `requests` 作者 `Kenneth Reitz` 写的一个命令行工具，主要包含了 `Pipfile` 、 `pip` 、 `click` 、 `requests` 和 `virtualenv` ，能够有效管理Python多个环境，各种第三方包及模块。它会自动为您的项目创建和管理一个 `virtualenv` ，并在安装/卸载包时从 `Pipfile` 中添加/删除包。它还生成非常重要的 `Pipfile.lock` 文件，用于生成**确定性构建**。

[Github地址](https://github.com/pypa/pipenv)

## 特性

* `pipenv`集成了`pip`，`virtualenv`两者的功能，且完善了两者的一些缺陷。
* 管理`requirements.txt`文件可能会有问题，而`Pipenv`使用`Pipfile`和`Pipfile.lock` 这使得对于基本用例来说更为优越。
* 各个地方使用了哈希校验，不仅安全，且会自动公开安全漏洞。
* 让您深入了解自己的关系依赖图（例如`$ pipenv graph`）。
* 通过加载`.env`文件简化开发工作流程。
