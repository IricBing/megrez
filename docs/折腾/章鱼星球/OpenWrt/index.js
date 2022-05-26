const sideRoute = require('./旁路由配置');
const kodExplorer = require('./可道云');
const coremark = require('./coremark');

module.exports = {
  title: 'OpenWrt',
  path: '/折腾/章鱼星球/OpenWrt/',
  children: [sideRoute, kodExplorer, coremark]
};
