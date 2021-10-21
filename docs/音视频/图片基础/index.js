const colorModel = require('./颜色模型');
const histogram = require('./直方图');
const binaryzation = require('./二值化');

module.exports = {
  title: '图片基础',
  children: [colorModel, histogram, binaryzation]
};
