const imagePress = require('./图片压缩');
const exportCSV = require('./导出csv文件');
const exportExcel = require('./导出Excel文件');
const codeConfusion = require('./代码混淆');

module.exports = {
  title: '实践积累',
  children: [imagePress, exportCSV, exportExcel, codeConfusion]
};
