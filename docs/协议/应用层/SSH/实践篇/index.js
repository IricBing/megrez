const clearRecord = require('./清除记录');
const kegGenerate = require('./生成本机秘钥');

module.exports = {
  title: '实践篇',
  children: [kegGenerate, clearRecord]
};
