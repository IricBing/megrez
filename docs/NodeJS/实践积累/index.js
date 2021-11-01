const imagePress = require('./图片压缩');
const exportCSV = require('./导出csv文件');
const exportExcel = require('./导出Excel文件');

module.exports = {
  title: '实践积累',
  children: [imagePress, exportCSV, exportExcel]
};
