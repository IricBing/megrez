const newVersion = require('./版本新特性');
const base = require('./基础篇');
const psql = require('./PSQL');
const ops = require('./运维篇');
const pgAdmin = require('./pgAdmin');
const ecological = require('./生态篇');

module.exports = {
  title: 'PostgreSQL',
  children: [base, ops, psql, newVersion, pgAdmin, ecological]
};
