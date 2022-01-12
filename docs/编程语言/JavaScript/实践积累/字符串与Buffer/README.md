# 字符串与Buffer

## 十六进制字符转Buffer

### 前端转成ArrayBuffer

```js
const hex = 'AA5504B10000B5'
const typedArray = new Uint8Array(hex.match(/\w{2}/g).map(i => parseInt(i, 16)))
const buffer = typedArray.buffer
```
