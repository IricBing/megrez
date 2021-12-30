const vuepress = require('./vuepress');
const miniProgram = require('./微信小程序');
const libs = require('./常用库');
const experience = require('./实践积累');
const vue2 = require('./Vue2');
const vue3 = require('./Vue3');
const vite = require('./Vite');
const uniApp = require('./uni-app');
const chrome = require('./Chrome');
const official = require('./微信公众号');
const docsify = require('./docsify');
const elementUI = require('./ElementUI');
const electron = require('./Electron');

module.exports = {
  title: 'Web',
  children: [experience, libs, vue2, vue3, elementUI, vite, uniApp, miniProgram, official, electron, vuepress, docsify, chrome]
};
