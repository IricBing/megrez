const c = require('./C');
const javascript = require('./JavaScript');
const typescript = require('./TypeScript');
const csharp = require('./CSharp');
const lua = require('./Lua');
const python = require('./Python');
const rust = require('./Rust');
const markdown = require('./Markdown');
const go = require('./Go');

module.exports = {
  title: '编程语言',
  children: [c, javascript, typescript, csharp, lua, python, rust, go, markdown]
};
