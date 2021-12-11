const prometheus = require('./Prometheus');
const grafana = require('./Grafana');

module.exports = {
  title: '监控',
  path: '/运维/监控/',
  children: [
    {
      title: 'Docker Compose 完整配置',
      path: '/运维/监控/DockerCompose完整配置/'
    },
    prometheus,
    grafana
  ]
};
