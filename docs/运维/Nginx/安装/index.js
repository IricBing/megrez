const ubuntu2004 = require('./Ubuntu2004');
const windows = require('./Windows安装');

module.exports = {
  title: '安装',
  children: [ubuntu2004, windows]
};
