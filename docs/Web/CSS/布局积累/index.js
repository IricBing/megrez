const supperCenter = require('./超级居中');
const deconstructedPancakeLayout = require('./解构煎饼式布局');
const sidebarLayout = require('./侧边栏布局');
const pancakeStackLayout = require('./煎饼堆栈布局');
const classicGrailLayout = require('./经典圣杯布局');
const acrossTheGrid = require('./12跨网格');
const ram = require('./RAM');
const arrangeLayout = require('./排列布局');
const keepAspectRatio = require('./保持宽高比');
const keepMyStyle = require('./保持我的风格');

module.exports = {
  title: '布局积累',
  children: [
    supperCenter,
    deconstructedPancakeLayout,
    sidebarLayout,
    pancakeStackLayout,
    classicGrailLayout,
    acrossTheGrid,
    ram,
    arrangeLayout,
    keepAspectRatio,
    keepMyStyle
  ]
};
