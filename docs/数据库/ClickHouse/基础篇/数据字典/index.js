const internal = require('./内置字典');
const extension = require('./外部扩展字典');

module.exports = {
  title: '数据字典',
  path: '/数据库/ClickHouse/基础篇/数据字典/',
  children: [internal, extension]
};
