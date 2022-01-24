# PWA

> [!warning]
> [官方文档](https://docsify.js.org/#/zh-cn/pwa)的 `PWA` 功能只支持最基本的离线缓存，同时还会带来内容更新不及时的问题，本笔记并没有基于此，而是基于[workbox](../../../基础篇/PWA/workbox/README.md)自主实现的。

## workbox配置

安装 `workbox-cli` 包：

```bash
$ pnpm add -D workbox-cli
```

在项目根目录下新建 `workbox-config.js` 文件，写入如下内容：

```js
module.exports = {
    globDirectory: 'docs/',
    globPatterns: [
        '**/*.{md,js,ico,html,jpg,css}'
    ],
    swDest: 'docs/sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ],
    skipWaiting: true,
    clientsClaim: true
};
```

## ServiceWorker配置

新建 `docs/registerServiceWorker.js` 文件，写入如下内容：

```js
register(`/sw.js`, {
    ready() {
        console.log('App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB');
    },
    registered() {
        console.log('Service worker has been registered.');
    },
    cached() {
        console.log('Content has been cached for offline use.');
    },
    updatefound() {
        console.log('New content is downloading.');
    },
    updated() {
        console.log('New content is available; please refresh.');
        window.location.reload(); // serviceWorker缓存更新时刷新页面
    },
    offline() {
        console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
        console.error('Error during service worker registration:', error);
    }
});
```

接下来在 `index.html` 文件中引入：

```html
<script src="./registerServiceWorker.js"></script>
```

## package.json配置

修改 `package.json` 的启动配置：

```json
{
  "scripts": {
    "start": "node index.js && workbox generateSW workbox-config.js && docsify serve docs",
    "build": "node index.js && workbox generateSW workbox-config.js"
  }
}
```

## .gitignore配置

由于 `workbox` 会生成 `ServiceWorker` 的一些文件，所以需要将自动生成的文件写入到 `.gitignore` 配置中

```git
# workbox 自动生成文件
docs/sw.js
docs/sw.js.map
docs/workbox-*
```
