const docker = require('./Docker');
const postgreSQL = require('./PostgreSQL');
const sql = require('./SQL');
const tdengine = require('./TDengine');
const redis = require('./Redis');
const mongodb = require('./MongoDB');
const sqlite = require('./SQLite');
const clickHouse = require('./ClickHouse');
const sqlServer = require('./SQLServer');
const questDB = require('./QuestDB');
const mysql = require('./MySQL');

module.exports = {
  title: '数据库',
  children: [docker, sql, postgreSQL, redis, mongodb, clickHouse, mysql, tdengine, sqlite, sqlServer, questDB]
};
