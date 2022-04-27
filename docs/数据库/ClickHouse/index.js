const environment = require('./环境篇');
const ecological = require('./生态篇');
const client = require('./client');
const basic = require('./基础篇');
const practice = require('./实践篇');
const miningPitGuide = require('./采坑指南');

module.exports = {
  title: 'ClickHouse',
  path: '/数据库/ClickHouse/',
  children: [environment, basic, practice, ecological, client, miningPitGuide]
};
