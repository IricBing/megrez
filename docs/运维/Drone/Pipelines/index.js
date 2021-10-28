const dockerPipeline = require('./DockerPipeline');
const execPipeline = require('./ExecPipeline');
const sshPipeline = require('./SSHPipeline');

module.exports = {
  title: 'Pipelines',
  path: '/运维/Drone/Pipelines/',
  children: [
    dockerPipeline,
    execPipeline,
    sshPipeline,
    {
      title: '接入GitHub私有仓库',
      path: '/运维/Drone/Pipelines/GitHub私有仓库'
    }
  ]
};
