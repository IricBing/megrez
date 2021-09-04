const docker = require('./Docker');
const postgreSQL = require('./PostgreSQL');
const sql = require('./SQL');

module.exports = {
  title: '数据库',
  children: [docker, sql, postgreSQL]
};
