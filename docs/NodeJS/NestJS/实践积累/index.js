const authentication = require('./认证');
const email = require('./email');
const socketIOCluster = require('./socket.io集群版');
const redis = require('./redis')

module.exports = {
  title: '实践积累',
  children: [
    authentication,
    {
      title: '支持XML传参',
      path: '/NodeJS/NestJS/实践积累/支持XML传参'
    },
    {
      title: '公众号服务器配置',
      path: '/NodeJS/NestJS/实践积累/公众号服务器配置/'
    },
    email,
    redis,
    socketIOCluster
  ]
};
