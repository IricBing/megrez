const newVersion = require('./版本新特性');
const base = require('./基础篇');
const psql = require('./PSQL');

module.exports = {
  title: 'PostgreSQL',
  children: [base, psql, newVersion]
};
