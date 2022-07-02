const luaSocket = require('./LuaSocket');
const luaCURL = require('./LuaCURL');
const pack = require('./pack');

module.exports = {
  title: '常用库',
  children: [luaSocket, luaCURL, pack]
};
