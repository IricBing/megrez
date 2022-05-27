const simpleServer = require('./精简服务器');
const imagePress = require('./图片压缩');
const exportCSV = require('./导出csv文件');
const exportExcel = require('./导出Excel文件');
const codeConfusion = require('./代码混淆');
const packager = require('./打包');
const codec = require('./编解码');

module.exports = {
  title: '实践积累',
  children: [codec, simpleServer, imagePress, exportCSV, exportExcel, codeConfusion, packager]
};
