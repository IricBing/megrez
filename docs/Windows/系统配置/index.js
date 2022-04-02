const chocolatey = require('./Chocolatey');
const terminalOptimize = require('./终端美化');
const trafficMonitor = require('./TrafficMonitor');
const clover = require('./Clover文件资源管理器扩展')
const qttabbar = require('./qttabbar');

module.exports = {
  title: '系统配置',
  children: [
    chocolatey,
    {
      title: '安装Fira Code字体',
      path: '/Windows/系统配置/安装FiraCode字体'
    },
    terminalOptimize,
    trafficMonitor,
    clover,
    qttabbar
  ]
};
