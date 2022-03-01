const appStartup = require('./程序开机启动');
const appKeepAlive = require('./程序保活');
const nssm = require('./nssm');

module.exports = {
  title: '实践积累',
  children: [appStartup, appKeepAlive, nssm]
};
