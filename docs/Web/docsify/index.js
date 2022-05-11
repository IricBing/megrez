const config = require('./项目配置');
const extension = require('./扩展插件');
const trouble = require('./踩坑指南');

module.exports = {
  title: 'docsify',
  path: '/Web/docsify/',
  children: [config, extension, trouble]
};
