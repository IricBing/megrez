const projectConfig = require('./工程配置');
const ecology = require('./生态');
const base = require('./基础篇');
const container = require('./容器镜像篇');

module.exports = {
  title: 'Vue 3.x',
  path: '/Web/Vue3/',
  children: [projectConfig, base, ecology, container]
};
