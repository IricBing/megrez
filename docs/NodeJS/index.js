const base = require('./基础篇');
const pm2 = require('./pm2');
const npm = require('./npm');
const versionControl = require('./版本控制');
const nestjs = require('./NestJS');
const optimizing = require('./优化篇');
const ops = require('./运维篇');
const practice = require('./实践积累');

module.exports = {
  title: 'NodeJS',
  children: [versionControl, base, npm, pm2, nestjs, optimizing, ops, practice]
};
