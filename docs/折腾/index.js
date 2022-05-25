const openwrt = require('./OpenWrt');
const homeNetwork = require('./家庭网络');
const octopusPlanet = require('./章鱼星球');
const histb = require('./海思机顶盒');

module.exports = {
  title: '折腾',
  path: '/折腾/',
  children: [openwrt, homeNetwork, octopusPlanet, histb]
};
