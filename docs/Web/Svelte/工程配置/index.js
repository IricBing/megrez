const rollup = require('./rollup');
const webpack = require('./webpack');

module.exports = {
  title: '工程配置',
  children: [rollup, webpack]
};
