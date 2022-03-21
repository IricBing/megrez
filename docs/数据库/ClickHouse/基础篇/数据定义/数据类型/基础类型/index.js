const numberType = require('./数值类型');
const stringType = require('./字符串类型');
const dateType = require('./时间类型');

module.exports = {
  title: '基础类型',
  path: '/数据库/ClickHouse/基础篇/数据定义/数据类型/基础类型/',
  children: [numberType, stringType, dateType]
};
