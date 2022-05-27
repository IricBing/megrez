# Base64

> [!tip|label: 提示]
> `Node.js` 不支持用于 `Base64` 编码的标准 `JavaScript` 函数，例如 `atob()` 和 `btoa()` 。这些方法是窗口对象的一部分，**仅在浏览器中可用**。

`Node.js` 提供了一个称为 `Buffer` 的本地模块，可用于执行 `Base64` 编码和解码。缓冲区可用作全局对象，这意味着您无需在应用程序中显式包含此模块。

在内部， `Buffer` 以字节序列的形式表示二进制数据。 `Buffer` 对象提供了几种方法来执行不同的编码和解码转换。这包括往返于 `UTF-8` ， `UCS2` ， `Base64` ， `ASCII` ， `UTF-16` 甚至 `HEX` 编码方案

## 编码

```js
// plain-text string
const str = 'Base64 Encoding in Node.js';

// create a buffer
const buff = Buffer.from(str, 'utf-8');

// encode buffer as Base64
const base64 = buff.toString('base64');

// print Base64 string
console.log(base64);

// QmFzZTY0IEVuY29kaW5nIGluIE5vZGUuanM=
```

## 解码

```js
// Base64 encoded string
const base64 = 'QmFzZTY0IEVuY29kaW5nIGluIE5vZGUuanM=';

// create a buffer
const buff = Buffer.from(base64, 'base64');

// decode buffer as UTF-8
const str = buff.toString('utf-8');

// print normal string
console.log(str);

// Base64 Encoding in Node.js
```
