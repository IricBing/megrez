const ubuntu = require('./Ubuntu');
const base = require('./基础篇');
const sosumi = require('./sosumi');
const alpine = require('./Alpine');
const seLinux = require('./SELinux');
const armbian = require('./Armbian');
const yocto = require('./Yocto');
const debian = require('./Debian');

module.exports = {
  title: 'Linux',
  children: [base, ubuntu, alpine, debian, seLinux, sosumi, armbian, yocto]
};
