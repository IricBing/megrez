const manageDependency = require('./管理依赖');
const reviewDependency = require('./查看依赖');

module.exports = {
  title: 'CLI 命令',
  path: '/NodeJS/pnpm/CLI命令/',
  children: [manageDependency, reviewDependency]
};
