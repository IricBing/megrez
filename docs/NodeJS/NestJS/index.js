const config = require('./配置篇');
const container = require('./容器镜像篇');
const fillPitManual = require('./填坑手册');
const ops = require('./运维篇');
const practice = require('./实践积累');

module.exports = {
  title: 'NestJS',
  children: [config, container, ops, practice, fillPitManual]
};
