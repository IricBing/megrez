const trouble = require('./踩坑集锦');
const config = require('./项目配置');
const practice = require('./实践积累');
const base = require('./基础篇');

module.exports = {
  title: 'Electron',
  path: '/Web/Electron/',
  children: [config, base, practice, trouble]
};
