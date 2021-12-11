const install = require('./安装');
const exporters = require('./exporters');

module.exports = {
  title: 'Prometheus',
  path: '/运维/Prometheus/',
  children: [install, exporters]
};
