const lodash = require('./Lodash');
const katex = require('./KaTeX');
const moment = require('./moment');
const dayjs = require('./dayjs');
const threejs = require('./threejs');
const markdownIt = require('./markdown_it');
const openLayers = require('./OpenLayers');
const axios = require('./axios');
const prismjs = require('./PrismJS');
const zone = require('./Zone');
const fabricJS = require('./Fabric.js');

module.exports = {
  title: '常用库',
  children: [lodash, moment, dayjs, axios, fabricJS, zone, threejs, openLayers, markdownIt, katex, prismjs]
};
