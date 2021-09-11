const docker = require('./Docker');
const postgreSQL = require('./PostgreSQL');
const sql = require('./SQL');
const tdengine = require('./TDengine');
const redis = require('./Redis');
const mongodb = require('./MongoDB');
const sqlite = require('./SQLite');

module.exports = {
  title: '数据库',
  children: [docker, sql, postgreSQL, redis, mongodb, tdengine, sqlite]
};
