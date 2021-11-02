const openCV = require('./OpenCV');
const matplotlib = require('./Matplotlib');
const pillow = require('./Pillow');
const skimage = require('./Scikit_Image');

module.exports = {
  title: '常用库',
  children: [openCV, matplotlib, pillow, skimage]
};
