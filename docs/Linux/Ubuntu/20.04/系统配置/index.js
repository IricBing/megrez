const useDeepinTerminal = require('./使用深度终端');
const vscodeExtension = require('./右键扩展vscode打开');
const configZsh = require('./配置zsh');
const installSimHeiFont = require('./安装SimHei字体');

module.exports = {
  title: '系统配置',
  children: [
    {
      title: '美化',
      path: '/Linux/Ubuntu/20.04/系统配置/美化'
    },
    {
      title: '实时显示网速',
      path: '/Linux/Ubuntu/20.04/系统配置/实时显示网速'
    },
    useDeepinTerminal,
    vscodeExtension,
    configZsh,
    {
      title: '配置静态ip',
      path: '/Linux/Ubuntu/20.04/系统配置/配置静态ip'
    },
    {
      title: '多网卡路由规则配置',
      path: '/Linux/Ubuntu/20.04/系统配置/多网卡路由规则配置'
    },
    {
      title: '安装Fira Code字体',
      path: '/Linux/Ubuntu/20.04/系统配置/安装FiraCode字体'
    },
    installSimHeiFont,
    {
      title: '搭建NFS文件系统',
      path: '/Linux/Ubuntu/20.04/系统配置/搭建NFS文件系统'
    }
  ]
};
