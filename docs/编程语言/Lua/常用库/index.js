const luaSocket = require('./LuaSocket');
const luaCURL = require('./LuaCURL');
const pack = require('./pack');
const luaFileSystem = require('./LuaFileSystem');
const luabitop = require('./LuaBitOp');

module.exports = {
  title: '常用库',
  children: [luaSocket, luaCURL, pack, luaFileSystem, luabitop]
};
