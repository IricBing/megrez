const connectionConfig = require('./数据库连接数配置');
const bakAndRestore = require('./备份与还原');
const performanceAndTroubleShooting = require('./性能与疑难杂症');

module.exports = {
  title: '运维篇',
  children: [bakAndRestore, connectionConfig, performanceAndTroubleShooting]
};
