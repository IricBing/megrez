const nginx = require('./nginx_ingress');
const haproxy = require('./haproxy_ingress');

module.exports = {
  title: 'Ingress Controller',
  path: '/容器/Kubernetes/基础篇/Ingress/controller/',
  children: [nginx, haproxy]
};
