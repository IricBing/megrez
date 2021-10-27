const plugin = require('./插件');
const codeSpaceConfig = require('./接入代码仓库');
const installRunners = require('./安装Runners');
const pipelines = require('./Pipelines');

module.exports = {
  title: 'Drone',
  path: '/运维/Drone/',
  children: [codeSpaceConfig, installRunners, pipelines, plugin]
};
