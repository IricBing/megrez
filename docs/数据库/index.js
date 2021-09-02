const docker = require('./Docker');
const postgreSQL = require('./PostgreSQL');

module.exports = {
  title: '数据库',
  children: [docker, postgreSQL]
};
