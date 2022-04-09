const dataType = require('./数据类型');
const dataTable = require('./数据表定义');
const dataTableOperation = require('./数据表的基本操作');

module.exports = {
  title: '数据定义',
  path: '/数据库/ClickHouse/基础篇/数据定义/',
  children: [dataType, dataTable, dataTableOperation]
};
