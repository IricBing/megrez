const decompilation = require('./反编译');
const msiUnpack = require('./msi文件解包');
const diskScale = require('./磁盘扩缩容');

module.exports = {
  title: '奇技淫巧',
  children: [decompilation, msiUnpack, diskScale]
};
