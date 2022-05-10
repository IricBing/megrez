# tabs

[GitHub地址](https://github.com/pskordilakis/vuepress-plugin-tabs)

## 安装

<!-- tabs:start -->

#### pnpm

```bash
$ pnpm add vuepress-plugin-tabs vue-tabs-component
```

#### npm

```bash
$ npm i vuepress-plugin-tabs vue-tabs-component
```

#### yarn

```bash
$ yarn add vuepress-plugin-tabs vue-tabs-component
```

<!-- tabs:end -->

## 配置

修改 `.vuepress/config.js` 配置文件，在 `plugins` 字段中增加 `'tabs'` 内容，如下所示：

```js
module.exports = {
    plugins: ['tabs']
}
```

修改 `.vuepress/styles/index.styl` 样式文件，引入插件主题样式：

```css
@require '~vuepress-plugin-tabs/dist/themes/default.styl'
```

## 用法

参见[官方文档](https://github.com/pskordilakis/vuepress-plugin-tabs#usage)
