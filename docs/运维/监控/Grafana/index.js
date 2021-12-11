const install = require('./安装');
const dashboards = require('./Dashboards');

module.exports = {
  title: 'Grafana',
  path: '/运维/监控/Grafana/',
  children: [install, dashboards]
};
