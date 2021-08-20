const desktopApplication = require('./桌面应用程序开发');
const systemConfig = require('./系统配置');
const entityFramework = require('./EntityFramework');

module.exports = {
  title: 'Windows',
  children: [entityFramework, desktopApplication, systemConfig]
};
