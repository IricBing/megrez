const baseUsage = require('./基本使用');
const advanceUsage = require('./进阶用法');
const gitlab = require('./Gitlab');

module.exports = {
  title: 'Git',
  children: [baseUsage, advanceUsage, gitlab]
};
