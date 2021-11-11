const vueRouter = require('./vue_router');
const pinia = require('./Pinia');

module.exports = {
  title: '生态',
  children: [vueRouter, pinia]
};
