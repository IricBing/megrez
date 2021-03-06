const create = require('./create')
const appManagement = require('./应用程序管理');
const workingWithApp = require('./应用程序调试');
const clusterManagement = require('./集群管理');
const settingAndUsage = require('./配置使用');

module.exports = {
  title: 'kubectl',
  path: '/容器/Kubernetes/命令篇/kubectl/',
  children: [
    create,
    {
      title: 'kubectl get',
      path: '/容器/Kubernetes/命令篇/kubectl/get'
    },
    {
      title: 'kubectl run',
      path: '/容器/Kubernetes/命令篇/kubectl/run'
    },
    {
      title: 'kubectl expose',
      path: '/容器/Kubernetes/命令篇/kubectl/expose'
    },
    {
      title: 'kubectl delete',
      path: '/容器/Kubernetes/命令篇/kubectl/delete'
    },
    appManagement,
    workingWithApp,
    clusterManagement,
    settingAndUsage
  ]
};
