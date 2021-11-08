const nginx = require('./nginx');
const haproxy = require('./haproxy');

module.exports = {
  title: 'Ingress Controller',
  path: '/容器/Kubernetes/基础篇/Ingress/controller/',
  children: [nginx, haproxy]
};
