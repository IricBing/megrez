const environment = require('./环境篇');
const ecological = require('./生态篇');
const client = require('./client');

module.exports = {
  title: 'ClickHouse',
  path: '/数据库/ClickHouse/',
  children: [environment, ecological, client]
};
