const base = require('./基础篇');
const practice = require('./实践篇');
const helmChart = require('./helm');

module.exports = {
  title: 'Kubernetes',
  path: '/容器/Kubernetes/',
  children: [base, practice, helmChart]
};
