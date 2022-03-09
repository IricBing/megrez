const install = require('./安装');
const base = require('./基础篇');
const operations = require('./运维篇');
const practice = require('./实践篇');

module.exports = {
  title: 'MongoDB',
  children: [install, base, practice, operations]
};
