const openwrt = require('./OpenWrt');
const homeNetwork = require('./家庭网络');
const octopusPlanet = require('./章鱼星球');
const histb = require('./海思机顶盒');
const miRouter4C = require('./小米路由器4C');
const miRouterR3G = require('./小米路由器R3G');

module.exports = {
  title: '折腾',
  path: '/折腾/',
  children: [openwrt, homeNetwork, octopusPlanet, miRouter4C, miRouterR3G, histb]
};
