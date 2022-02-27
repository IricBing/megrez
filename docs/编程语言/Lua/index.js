const base = require('./基础篇');
const practice = require('./实践篇');
const designPatterns = require('./设计模式');
const advance = require('./进阶篇');

module.exports = {
  title: 'Lua',
  path: '/编程语言/Lua/',
  children: [base, advance, practice, designPatterns]
};
