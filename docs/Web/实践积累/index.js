const browserDownloadFile = require('./浏览器下载文件');
const mobileHttpSlow = require('./手机端接口反应慢');
const chromeDebugMobileWeb = require('./chrome调试手机端网页');
const responsiveViewer = require('./ResponsiveViewer');
const tts = require('./语音播报');
const serialAPI = require('./WebSerialAPI');
const bigFileUpload = require('./大文件上传');
const imagePress = require('./图片压缩');

module.exports = {
  title: '实践积累',
  children: [browserDownloadFile, mobileHttpSlow, chromeDebugMobileWeb, responsiveViewer, tts, serialAPI, bigFileUpload, imagePress]
};
