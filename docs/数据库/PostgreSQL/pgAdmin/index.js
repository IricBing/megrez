const connectDatabase = require('./连接数据库');

module.exports = {
  title: 'pgAdmin',
  path: '/数据库/PostgreSQL/pgAdmin/',
  children: [connectDatabase]
};
