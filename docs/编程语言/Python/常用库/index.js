const openCV = require('./OpenCV');
const matplotlib = require('./Matplotlib');
const pillow = require('./Pillow');

module.exports = {
  title: '常用库',
  children: [openCV, matplotlib, pillow]
};
