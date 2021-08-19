const vuepress = require('./vuepress');
const miniProgram = require('./微信小程序');
const libs = require('./常用库');
const experience = require('./实践积累');
const vue2 = require('./Vue2');

module.exports = {
  title: 'Web',
  children: [experience, libs, vue2, miniProgram, vuepress]
};
