# Go to top

[插件文档](https://vuepress.vuejs.org/zh/plugin/official/plugin-back-to-top.html)

## 安装

```bash
$ yarn add -D @vuepress/plugin-back-to-top
```

## 配置

在 `.vuepress/config.js` 文件中配置 `plugin` 字段，如下所示：

```javascript
module.exports = {
    // ...
    plugins: [
        // ...
        ['@vuepress/back-to-top']
    ]
}
```

由于这个插件和[宠物猫](./宠物猫.md)插件在空间上冲突了，有舍不得猫咪，所以调整一下按钮的位置。在 `.vuepress/styles/index.styl` 文件，写入如下内容

```css
.go-to-top {
    right: 0.5rem !important
}
```
