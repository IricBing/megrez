const docker = require('./Docker安装');
const ubuntu2004 = require('./Ubuntu2004安装');

module.exports = {
  title: '安装',
  children: [docker, ubuntu2004]
};
