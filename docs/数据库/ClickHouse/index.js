const environment = require('./环境篇');
const ecological = require('./生态篇');
const client = require('./client');
const basic = require('./基础篇');

module.exports = {
  title: 'ClickHouse',
  path: '/数据库/ClickHouse/',
  children: [environment, basic, ecological, client]
};
