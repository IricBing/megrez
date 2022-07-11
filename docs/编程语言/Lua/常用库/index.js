const luaSocket = require('./LuaSocket');
const luaCURL = require('./LuaCURL');
const pack = require('./pack');
const luaFileSystem = require('./LuaFileSystem');

module.exports = {
  title: '常用库',
  children: [luaSocket, luaCURL, pack, luaFileSystem]
};
