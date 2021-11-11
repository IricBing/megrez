const lodash = require('./Lodash');
const katex = require('./KaTeX');
const moment = require('./moment');
const dayjs = require('./dayjs');
const threejs = require('./threejs');
const markdownIt = require('./markdown_it');
const openLayers = require('./OpenLayers');

module.exports = {
  title: '常用库',
  children: [lodash, katex, moment, dayjs, threejs, openLayers, markdownIt]
};
