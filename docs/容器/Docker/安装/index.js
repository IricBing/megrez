const ubuntu2004 = require('./Ubuntu20.04安装');

module.exports = {
  title: '安装',
  children: [
    ubuntu2004,
    {
      title: 'Windows10 安装',
      path: '/容器/Docker/安装/Windows10安装/'
    },
    {
      title: '代理配置',
      path: '/容器/Docker/安装/代理配置'
    }
  ]
}