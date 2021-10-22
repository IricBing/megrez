const manager = require('./虚拟机管理');
const network = require('./网络篇');

module.exports = {
  title: 'VirtualBox',
  children: [manager, network]
};
