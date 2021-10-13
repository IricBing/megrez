const conda = require('./conda');
const virtualenv = require('./virtualenv');
const pipenv = require('./pipenv');

module.exports = {
  title: '环境配置',
  children: [pipenv, conda, virtualenv]
};
