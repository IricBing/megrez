const config = require('./配置篇');
const errorHandler = require('./错误处理')

module.exports = {
  title: 'Nginx',
  children: [
    {
      title: '版本说明',
      path: '/运维/Nginx/版本说明'
    },
    config,
    errorHandler
  ]
};
