const manager = require('./虚拟机管理');
const network = require('./网络篇');
const troubleshooting = require('./采坑指南');

module.exports = {
  title: 'VirtualBox',
  children: [manager, network, troubleshooting]
};
