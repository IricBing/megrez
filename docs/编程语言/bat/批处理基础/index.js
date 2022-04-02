const command = require('./命令汇总');
const attentions = require('./注释');
const echo = require('./echo');
const pause = require('./PAUSE');
const errorLevel = require('./errorlevel');
const title = require('./title');
const color = require('./COLOR');
const mode = require('./mode配置系统设备');
const goto = require('./GOTO');
const find = require('./find');
const start = require('./start');
const assocAndFType = require('./assoc和ftype');

module.exports = {
  title: '批处理基础',
  children: [command, attentions, echo, pause, errorLevel, title, color, mode, goto, find, start, assocAndFType]
};
