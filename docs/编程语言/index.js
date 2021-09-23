const c = require('./C');
const javascript = require('./JavaScript');
const typescript = require('./TypeScript');
const csharp = require('./CSharp');
const lua = require('./Lua');

module.exports = {
  title: '编程语言',
  children: [c, javascript, typescript, csharp, lua]
};
