const install = require('./安装');
const baseOperate = require('./基本操作');
const dataType = require('./数据类型');
const operator = require('./运算符');
const func = require('./函数');
const insertUpdateDelete = require('./插入更新与删除数据');

module.exports = {
  title: '基础篇',
  children: [install, baseOperate, dataType, operator, func, insertUpdateDelete]
};
