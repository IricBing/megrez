const install = require('./安装');
const troubleshooting = require('./填坑手册');
const principle = require('./原理篇');

module.exports = {
  title: 'Gitlab',
  path: '/Git/Gitlab/',
  children: [install, principle, troubleshooting]
};
