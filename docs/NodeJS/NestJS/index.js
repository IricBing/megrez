const config = require('./配置篇');
const container = require('./容器镜像篇');
const fillPitManual = require('./填坑手册');
const ops = require('./运维篇');
const practice = require('./实践积累');
const micro = require('./微服务');
const base = require('./基础篇');
const plugin = require('./插件篇');

module.exports = {
  title: 'NestJS',
  children: [config, base, plugin, container, ops, micro, practice, fillPitManual]
};
