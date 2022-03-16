const di = require('./DI');
const ioc = require('./Ioc');
const mvvm = require('./MVVM');

module.exports = {
  title: '架构思想',
  children: [di, ioc, mvvm]
};
