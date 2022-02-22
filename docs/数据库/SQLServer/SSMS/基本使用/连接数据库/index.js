const windowsAuth = require('./Windows身份认证');
const sqlServerAuth = require('./SQLServer身份认证');

module.exports = {
  title: '连接数据库',
  children: [windowsAuth, sqlServerAuth]
};
