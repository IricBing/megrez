# 搜索

`docsify` 自身支持搜索，[官方文档](https://docsify.js.org/#/zh-cn/plugins?id=%e5%85%a8%e6%96%87%e6%90%9c%e7%b4%a2-search)

在 `index.html` 文件中引入相关库 ：

```html
<!-- 搜索支持 -->
<script src="https://cdn.9xing.cn/docsify/4.12.2/plugins/search.min.js"></script>
```

配置：

```js
window.$docsify = {
    search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        placeholder: '关键字搜索',
        noData: '暂无笔记',
        depth: 6, // 搜索标题的最大层级, 1 - 6
        hideOtherSidebarContent: false // 是否隐藏其他侧边栏内容
    }
}
```
