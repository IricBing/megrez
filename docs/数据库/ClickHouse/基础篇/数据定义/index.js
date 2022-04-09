const dataType = require('./数据类型');
const dataTable = require('./数据表定义');
const dataTableOperation = require('./数据表的基本操作');
const partitionOperation = require('./数据分区的基本操作');
const distributeDDLExec = require('./分布式DDL执行');
const dataWrite = require('./数据的写入');
const dataDeleteAndUpdate = require('./数据的删除与修改');

module.exports = {
  title: '数据定义',
  path: '/数据库/ClickHouse/基础篇/数据定义/',
  children: [dataType, dataTable, dataTableOperation, partitionOperation, distributeDDLExec, dataWrite, dataDeleteAndUpdate]
};
