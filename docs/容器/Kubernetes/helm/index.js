const install = require('./安装');
const baseUsage = require('./基本使用');
const repo = require('./repo');
const aliRepo = require('./阿里云仓库');
const practice = require('./实践篇');

module.exports = {
  title: 'Helm Chart',
  path: '/容器/Kubernetes/helm/',
  children: [
    install,
    {
      title: '换源',
      path: '/容器/Kubernetes/helm/换源'
    },
    baseUsage,
    repo,
    aliRepo,
    practice
  ]
};
