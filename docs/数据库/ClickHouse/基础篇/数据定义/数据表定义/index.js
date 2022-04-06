const database = require('./数据库');
const table = require('./数据表');
const defaultValue = require('./默认值表达式');
const tempTable = require('./临时表');
const partTable = require('./分区表');
const schema = require('./视图');

module.exports = {
  title: '数据表定义',
  children: [database, table, defaultValue, tempTable, partTable, schema]
};
