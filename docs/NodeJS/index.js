const pm2 = require('./pm2');
const npm = require('./npm');
const versionControl = require('./版本控制');
const nestjs = require('./NestJS');

module.exports = {
  title: 'NodeJS',
  children: [versionControl, npm, pm2, nestjs]
};
