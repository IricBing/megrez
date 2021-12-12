const chinese = require('./汉化资源');
const nodeExporterFull = require('./NodeExporterFull');

module.exports = {
  title: 'Dashboards',
  path: '/运维/监控/Grafana/Dashboards/',
  children: [chinese, nodeExporterFull]
};
