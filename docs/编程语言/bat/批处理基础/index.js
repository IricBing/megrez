const command = require('./命令汇总');
const attentions = require('./注释');
const echo = require('./echo');
const pause = require('./PAUSE');
const errorLevel = require('./errorlevel');
const title = require('./title');

module.exports = {
  title: '批处理基础',
  children: [command, attentions, echo, pause, errorLevel, title]
};
