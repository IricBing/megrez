const ubuntu = require('./Ubuntu');
const base = require('./基础篇');
const sosumi = require('./sosumi');
const alpine = require('./Alpine');
const seLinux = require('./SELinux');
const armbian = require('./Armbian');

module.exports = {
  title: 'Linux',
  children: [base, ubuntu, alpine, seLinux, sosumi, armbian]
};
