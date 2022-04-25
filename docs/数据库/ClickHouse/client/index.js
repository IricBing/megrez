const install = require('./安装');
const basicUsage = require('./基本使用');
const miningPitGuide = require('./采坑指南');

module.exports = {
  title: 'client',
  path: '/数据库/ClickHouse/client/',
  children: [install, basicUsage, miningPitGuide]
};
