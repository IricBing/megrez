# 编码

虽然我们通常在常用的前后端软件中不需要单独处理编码问题（ `js` 默认就是 `utf-8` 编码），但是一旦遇到深入的，例如处理串口通信，蓝牙直接传输字节等等场景。这些场景就需要我们针对编码做单独处理了。

## 方案

这种属于常用需求，不需要重复造轮子，直接在使用常用的包即可，我们使用 `iconv-lite` 这个包，相关地址：[npm](https://www.npmjs.com/package/iconv-lite)、[GitHub](https://github.com/ashtuchkin/iconv-lite)。

示例：将字符串转为 `GB2312` 编码的**十六进制**显示：

```js
const iconv = require('iconv-lite');
const hex = iconv.encode('我爱中国', 'gb2312').toString('hex');
```
