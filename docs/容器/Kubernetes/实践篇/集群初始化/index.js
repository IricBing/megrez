const trouble = require('./踩坑');
const optimize = require('./优化');

module.exports = {
  title: '集群初始化',
  children: [
    {
      title: 'Ubuntu 20.04 环境下初始化k8s集群',
      path: '/容器/Kubernetes/实践篇/集群初始化/Ubuntu20.04环境'
    },
    {
      title: '查看加入集群命令',
      path: '/容器/Kubernetes/实践篇/集群初始化/查看加入集群命令'
    },
    optimize,
    trouble
  ]
};
