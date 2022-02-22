const install = require('./安装');
const practice = require('./实践篇');
const ssms = require('./SSMS');

module.exports = {
  title: 'SQL Server',
  path: '/数据库/SQLServer/',
  children: [install, practice, ssms]
};
