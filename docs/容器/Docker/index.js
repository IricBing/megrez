const baseUse = require('./基本使用');
const baseKnowledge = require('./基础知识');
const install = require('./安装');
const imageBuild = require('./镜像构建');
const dockerCompose = require('./DockerCompose');
const dockerSwarm = require('./DockerSwarm');

module.exports = {
  title: 'Docker',
  children: [install, baseKnowledge, baseUse, imageBuild, dockerCompose, dockerSwarm]
};
