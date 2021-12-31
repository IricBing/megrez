const baseCmd = require('./基础命令');
const opsCmd = require('./运维命令');

module.exports = {
  title: '基本使用',
  children: [
    opsCmd,
    baseCmd,
    {
      title: 'apt软件更新',
      path: '/Linux/Ubuntu/基本使用/apt软件更新'
    },
    {
      title: '添加用户',
      path: '/Linux/Ubuntu/基本使用/添加用户'
    },
    {
      title: '切换软件源',
      path: '/Linux/Ubuntu/基本使用/切换软件源'
    },
    {
      title: '删除用户',
      path: '/Linux/Ubuntu/基本使用/删除用户'
    },
    {
      title: '修改主机名称',
      path: '/Linux/Ubuntu/基本使用/修改主机名称'
    },
    {
      title: '防火墙',
      path: '/Linux/Ubuntu/基本使用/防火墙'
    },
    {
      title: '服务器传输',
      path: '/Linux/Ubuntu/基本使用/服务器传输'
    },
    {
      title: '软硬链接',
      path: '/Linux/Ubuntu/基本使用/软硬链接'
    },
    {
      title: '终端代理配置',
      path: '/Linux/Ubuntu/基本使用/终端代理配置'
    },
    {
      title: '查看系统版本',
      path: '/Linux/Ubuntu/基本使用/查看系统版本'
    },
    {
      title: '查看CPU信息',
      path: '/Linux/Ubuntu/基本使用/查看CPU信息'
    },
    {
      title: '查看文件夹大小',
      path: '/Linux/Ubuntu/基本使用/查看文件夹大小'
    },
    {
      title: '查看串口',
      path: '/Linux/Ubuntu/基本使用/查看串口'
    },
    {
      title: '查看磁盘',
      path: '/Linux/Ubuntu/基本使用/查看磁盘'
    },
    {
      title: '挂载新磁盘',
      path: '/Linux/Ubuntu/基本使用/挂载新磁盘'
    },
    {
      title: '查看端口占用',
      path: '/Linux/Ubuntu/基本使用/查看端口占用'
    },
    {
      title: '查看端口监听',
      path: '/Linux/Ubuntu/基本使用/查看端口监听'
    },
    {
      title: '开机启动脚本',
      path: '/Linux/Ubuntu/基本使用/开机启动脚本'
    },
    {
      title: 'apt命令走代理',
      path: '/Linux/Ubuntu/基本使用/apt命令走代理'
    },
    {
      title: '软件源证书校验问题',
      path: '/Linux/Ubuntu/基本使用/软件源证书校验问题'
    },
    {
      title: '时区设置',
      path: '/Linux/Ubuntu/基本使用/时区设置'
    },
    {
      title: '修改时间',
      path: '/Linux/Ubuntu/基本使用/修改时间'
    },
    {
      title: '网络时间同步',
      path: '/Linux/Ubuntu/基本使用/网络时间同步'
    },
    {
      title: '依赖库调整',
      path: '/Linux/Ubuntu/基本使用/依赖库调整'
    },
    {
      title: '中文支持',
      path: '/Linux/Ubuntu/基本使用/中文支持'
    },
    {
      title: '关闭交换（swap）分区',
      path: '/Linux/Ubuntu/基本使用/关闭交换分区'
    }
  ]
};
