const releaseVersion = require('./发行版本');

module.exports = {
  title: '基础知识',
  children: [
    releaseVersion,
    {
      title: '启动步骤',
      path: '/Linux/Ubuntu/基础知识/启动步骤'
    },
    {
      title: '运行级别',
      path: '/Linux/Ubuntu/基础知识/运行级别'
    },
    {
      title: 'update-rc.d',
      path: '/Linux/Ubuntu/基础知识/update-rc.d'
    },
    {
      title: 'LVM',
      path: '/Linux/Ubuntu/基础知识/LVM'
    },
    {
      title: '依赖库',
      path: '/Linux/Ubuntu/基础知识/依赖库'
    },
    {
      title: '交换（swap）分区',
      path: '/Linux/Ubuntu/基础知识/交换分区'
    }
  ]
};
