# 文件下载

文件统一风格放到和 `md` 文件同级的 `assets/files` 文件夹下。

> [!tip|label: 提示]
> 这个是个人习惯。

## 临时方案

目前还没有找到完美的方案，只能使用 `HTML` 中的 `a` 标签来临时解决，缺点就是每次都要写**完整的路径**。

```html
<a href="Web/docsify/项目配置/PWA/assets/files/sw.js" download="sw.js">sw.js</a>
```
