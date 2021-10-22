const ubuntu = require('./Ubuntu');
const base = require('./基础篇');
const sosumi = require('./sosumi');
const alpine = require('./Alpine');

module.exports = {
  title: 'Linux',
  children: [base, ubuntu, alpine, sosumi]
};
