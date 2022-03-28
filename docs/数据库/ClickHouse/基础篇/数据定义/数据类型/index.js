const baseType = require('./基础类型');
const compositeType = require('./复合类型');
const specialType = require('./特殊类型');

module.exports = {
  title: '数据类型',
  path: '/数据库/ClickHouse/基础篇/数据定义/数据类型/',
  children: [baseType, compositeType, specialType]
};
