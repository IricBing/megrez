# net::ERR_INSUFFICIENT_RESOURCES

## 产生原因

`docsify` 在配置了官方搜索后，会默认在每次刷新的时候将所有的 `markdown` 文件全部拉下来并缓存，因为它是动态渲染的，搜索的本质是在 `markdown` 文件中搜索内容，这样就会导致当文章数量上来后每次刷新加载就会并发大量的请求到服务器，导致 `net::ERR_INSUFFICIENT_RESOURCES` 错误。

> [!tip|label: 提示]
> 这个是 `Chrome` 浏览器特有的，火狐浏览器没有这个问题。

## 解决办法

网站使用 `HTTP2` ，参见笔记：[Nginx配置HTTP2](../../../../运维/Nginx/配置篇/HTTP2.md)
