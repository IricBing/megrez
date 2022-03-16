const ubuntu2004 = require('./ubuntu20.04安装配置');
const windows10 = require('./Windows10');

module.exports = {
  title: '安装',
  children: [ubuntu2004, windows10]
};
