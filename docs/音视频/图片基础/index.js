const colorModel = require('./颜色模型');
const histogram = require('./直方图');
const binaryzation = require('./二值化');
const colorGradation = require('./色阶');
const imageFormat = require('./图片格式');

module.exports = {
  title: '图片基础',
  children: [imageFormat, colorModel, histogram, binaryzation, colorGradation]
};
