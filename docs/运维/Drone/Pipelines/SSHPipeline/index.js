const dockerDeploy = require('./Docker部署');
const dockerComposeDeploy = require('./DockerCompose部署');
const k8sDeploy = require('./k8s部署');

module.exports = {
  title: 'SSH Pipeline',
  path: '/运维/Drone/Pipelines/SSHPipeline/',
  children: [
    {
      title: 'sudo 权限问题',
      path: '/运维/Drone/Pipelines/SSHPipeline/sudo权限问题'
    },
    dockerDeploy,
    dockerComposeDeploy,
    k8sDeploy
  ]
};
