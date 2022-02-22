const install = require('./安装');
const ssms = require('./SSMS');

module.exports = {
  title: 'SQL Server',
  path: '/数据库/SQLServer/',
  children: [install, ssms]
};
