const desktopApplication = require('./桌面应用程序开发');
const systemConfig = require('./系统配置');
const entityFramework = require('./EntityFramework');
const base = require('./基础篇');
const util = require('./奇技淫巧');
const wsl = require('./WSL');

module.exports = {
  title: 'Windows',
  children: [base, entityFramework, desktopApplication, systemConfig, wsl, util]
};
