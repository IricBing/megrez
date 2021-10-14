# node图片压缩

::: tip 提示
这里是在后台进行图片压缩，在前台进行图片压缩不可采用这个技术。
:::

经过方案探究，采用[images](https://www.npmjs.com/package/images)这个包。

压缩示例：

```javascript
/* eslint-disable-next-line */
var images = require('images');

images(dataBuffer).size(800).save(join(storagePath, filename));
```

其中：
* `dataBuffer`：为图片的`buffer`信息，也可以采用**路径**。
* `save`中传入的是要保存的**图片地址**。

## 采坑集锦

### 类型编译报错

在 `nestjs` 工程中，采用 `import * as images from 'images'; ` 的写法后， `tsc` 编译就会报类型错误， `node` 版本是 `14.x` ， `nestjs` 版本是 `7.x` 。

解决方式是采用 `require` 写法，如下所示：

```javascript
/* eslint-disable-next-line */
var images = require('images');
```
