const branch = require('./分支');
const relationFile = require('./相关文件');

module.exports = {
  title: '基本使用',
  children: [
    relationFile,
    {
      title: '回滚代码',
      path: '/Git/基本使用/回滚代码'
    },
    {
      title: 'gitignore规则',
      path: '/Git/基本使用/ignore规则'
    },
    {
      title: 'pull',
      path: '/Git/基本使用/pull'
    },
    {
      title: 'tag',
      path: '/Git/基本使用/tag'
    },
    {
      title: '获取远端所有分支',
      path: '/Git/基本使用/获取远端所有分支'
    },
    {
      title: 'reflog',
      path: '/Git/基本使用/reflog'
    },
    branch
  ]
};
