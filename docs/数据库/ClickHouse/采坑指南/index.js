const typeError = require('./类型无法识别');
const queryError = require('./查询错误');

module.exports = {
  title: '采坑指南',
  children: [typeError, queryError]
};
