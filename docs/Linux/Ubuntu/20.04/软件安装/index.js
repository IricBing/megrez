const installFmaConfigTool = require('./安装fma-config-tool');

module.exports = {
  title: '软件安装',
  children: [
    {
      title: '安装深度截屏',
      path: '/Linux/Ubuntu/20.04/软件安装/安装深度截屏'
    },
    {
      title: '安装flameshot(火焰截屏)',
      path: '/Linux/Ubuntu/20.04/软件安装/安装flameshot'
    },
    {
      title: '安装微信等常用Windows软件',
      path: '/Linux/Ubuntu/20.04/软件安装/安装微信'
    },
    {
      title: '安装WPS',
      path: '/Linux/Ubuntu/20.04/软件安装/安装wps/'
    },
    installFmaConfigTool
  ]
};
