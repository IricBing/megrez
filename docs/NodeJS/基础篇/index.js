const childProcess = require('./child_process');
const cluster = require('./cluster');

module.exports = {
  title: '基础篇',
  children: [childProcess, cluster]
};
