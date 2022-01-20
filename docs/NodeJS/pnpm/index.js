const cli = require('./CLI命令');
const design = require('./设计思路');

module.exports = {
  title: 'pnpm',
  path: '/NodeJS/pnpm/',
  children: [
    {
      title: '安装',
      path: '/NodeJS/pnpm/安装'
    },
    design,
    cli
  ]
};
