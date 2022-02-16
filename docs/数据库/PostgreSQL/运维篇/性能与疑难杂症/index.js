const slowSQLLocation = require('./慢SQL定位');
const pg_stat_statementsPlugin = require('./pg_stat_statements插件');
const cpuHigh = require('./CPU占用资源过高');

module.exports = {
  title: '性能与疑难杂症',
  children: [pg_stat_statementsPlugin, slowSQLLocation, cpuHigh]
};
