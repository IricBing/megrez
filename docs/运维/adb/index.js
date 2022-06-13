const basicUsage = require('./基本使用');
const miningPitGuide = require('./采坑指南');
const install = require('./安装');

module.exports = {
  title: 'adb',
  path: '/运维/adb/',
  children: [install, basicUsage, miningPitGuide]
};
