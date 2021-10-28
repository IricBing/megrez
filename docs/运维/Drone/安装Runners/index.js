const dockerRunner = require('./DockerRunner');
const execRunner = require('./ExecRunner');
const sshRunner = require('./SSHRunner');

module.exports = {
  title: '安装 Runners',
  path: '/运维/Drone/安装Runners/',
  children: [dockerRunner, execRunner, sshRunner]
};
