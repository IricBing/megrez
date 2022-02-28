const qiankun = require('./qiankun');
const microApp = require('./micro-app');
const singleSPA = require('./single-spa');

module.exports = {
  title: '微前端',
  path: '/Web/微前端/',
  children: [qiankun, singleSPA, microApp]
};
