const install = require('./安装');
const exporters = require('./exporters');
const practice = require('./实践篇');

module.exports = {
  title: 'Prometheus',
  path: '/运维/监控/Prometheus/',
  children: [install, exporters, practice]
};
