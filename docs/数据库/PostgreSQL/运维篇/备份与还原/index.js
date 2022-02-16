const tableExport = require('./数据表导出');
const databaseExport = require('./数据库导出');
const databaseRestore = require('./数据库恢复');

module.exports = {
  title: '备份与还原',
  children: [databaseExport, tableExport, databaseRestore]
};
