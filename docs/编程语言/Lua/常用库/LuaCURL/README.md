# LuaCURL

首先我们从 `LuaRocks` 中找到这个包：[LuaRocks地址](https://luarocks.org/modules/luarocks/luacurl)

> [!tip|label: 提示]
> `luacurl` 这个包最开始是在 `luaforge` 中发布的，现在 `luaforge` 已经停止维护了， `LuaRocks` 中的官网地址已经打不开了：http://luaforge.net/projects/luacurl/

在 `GitHub` 上有一个库，应该是这个的新版本，[GitHub地址](https://github.com/Lua-cURL/Lua-cURLv3)，这个项目分了

* [lcurl](http://lua-curl.github.io/lcurl/modules/lcurl.html)
* [Lua-cURLv2 API](http://lua-curl.github.io/)
* [Lua-cURLv3 API](http://lua-curl.github.io/lcurl/modules/cURL.html)

三个版本，这个就比较复杂了，我们的 `Lua` 使用场景是**嵌入式**方向，不会需要复杂的应用，因此使用的是 `LuaRocks` 中的那个包，因为它只有一个 `C` 语言文件，很方便集成到我们的环境。

> [!note|label: note]
> 我们用的库 `api` 接口可能和 `GitHub` 上的[lcurl](http://lua-curl.github.io/lcurl/modules/lcurl.html)接口是一致的，不确定。

## 参考文档

因为这个很老了，而且仅仅是 `C` 语言的 `curl` 库的包装，源码非常简单。因此资料非常的少（主要还是官网不维护了），所以目前只找到一个网友的[博客](https://www.bbsmax.com/A/mo5kyGKMzw/)。当然，使用 `GitHub` 上项目的 [lcurl](http://lua-curl.github.io/lcurl/modules/lcurl.html)应该也是可行的，看起来 `api` 大致一样。
