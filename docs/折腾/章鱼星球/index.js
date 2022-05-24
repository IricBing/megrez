const burnSuite = require('./刷机套装');
const firmwareResource = require('./固件资源');
const openwrt = require('./OpenWrt');
const armbian = require('./Armbian');

module.exports = {
  title: '章鱼星球',
  path: '/折腾/章鱼星球/',
  children: [burnSuite, firmwareResource, openwrt, armbian]
};
