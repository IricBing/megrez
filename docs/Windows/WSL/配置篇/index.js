const systemMigration = require('./系统迁移');
const sshLoginConfig = require('./ssh登录配置');
const changeDefaultLoginUser = require('./修改默认登录用户');

module.exports = {
  title: '配置篇',
  children: [systemMigration, sshLoginConfig, changeDefaultLoginUser]
};
