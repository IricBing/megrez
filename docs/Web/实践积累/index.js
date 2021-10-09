const browserDownloadFile = require('./浏览器下载文件');
const mobileHttpSlow = require('./手机端接口反应慢');
const chromeDebugMobileWeb = require('./chrome调试手机端网页');

module.exports = {
  title: '实践积累',
  children: [browserDownloadFile, mobileHttpSlow, chromeDebugMobileWeb]
};
