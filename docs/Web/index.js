const vuepress = require('./vuepress');
const miniProgram = require('./微信小程序');
const libs = require('./常用库');

module.exports = {
  title: 'Web',
  children: [libs, miniProgram, vuepress]
};
