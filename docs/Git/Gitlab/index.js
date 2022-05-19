const install = require('./安装');
const troubleshooting = require('./填坑手册');
const principle = require('./原理篇');
const optimize = require('./优化篇');
const ops = require('./运维篇');

module.exports = {
  title: 'Gitlab',
  path: '/Git/Gitlab/',
  children: [install, principle, optimize, ops, troubleshooting]
};
