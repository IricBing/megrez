const install = require('./安装');

module.exports = {
  title: 'Helm Chart',
  path: '/容器/Kubernetes/helm/',
  children: [
    install,
    {
      title: '换源',
      path: '/容器/Kubernetes/helm/换源'
    }
  ]
};
