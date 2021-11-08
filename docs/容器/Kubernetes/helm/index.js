const install = require('./安装');
const repo = require('./repo');

module.exports = {
  title: 'Helm Chart',
  path: '/容器/Kubernetes/helm/',
  children: [
    install,
    {
      title: '换源',
      path: '/容器/Kubernetes/helm/换源'
    },
    repo
  ]
};
