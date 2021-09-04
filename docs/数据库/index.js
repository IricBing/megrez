const docker = require('./Docker');
const postgreSQL = require('./PostgreSQL');
const sql = require('./SQL');
const tdengine = require('./TDengine');
const redis = require('./Redis');

module.exports = {
  title: '数据库',
  children: [docker, sql, postgreSQL, redis, tdengine]
};
