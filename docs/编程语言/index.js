const base = require('./程序基础');
const c = require('./C');
const javascript = require('./JavaScript');
const typescript = require('./TypeScript');
const csharp = require('./CSharp');
const lua = require('./Lua');
const python = require('./Python');
const rust = require('./Rust');
const markdown = require('./Markdown');
const go = require('./Go');
const bat = require('./bat');

module.exports = {
  title: '编程语言',
  children: [base, c, javascript, typescript, csharp, lua, python, rust, go, markdown, bat]
};
