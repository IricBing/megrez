const codingStyle = require('./编码规范');
const luaRocks = require('./LuaRocks');
const sleep = require('./sleep');
const stringHandler = require('./字符串处理');
const tableExtension = require('./table扩展');

module.exports = {
  title: '实践篇',
  children: [codingStyle, stringHandler, luaRocks, sleep, tableExtension]
};
