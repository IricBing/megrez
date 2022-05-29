const ddns = require('./DDNS');
const miningPitGuide = require('./采坑指南');
const pppoe = require('./拨号上网');
const vpn = require('./VPN');

module.exports = {
  title: 'OpenWrt',
  path: '/折腾/OpenWrt/',
  children: [pppoe, ddns, vpn, miningPitGuide]
};
