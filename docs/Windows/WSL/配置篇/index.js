const systemMigration = require('./系统迁移');
const sshLoginConfig = require('./ssh登录配置');
const changeDefaultLoginUser = require('./修改默认登录用户');
const upgrade = require('./WSL1升级至WSL2');
const userMasterProxy = require('./使用宿主机代理');

module.exports = {
  title: '配置篇',
  children: [systemMigration, sshLoginConfig, changeDefaultLoginUser, upgrade, userMasterProxy]
};
