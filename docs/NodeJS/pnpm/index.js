const cli = require('./CLI命令');
const design = require('./设计思路');
const miningPitGuide= require('./采坑指南')

module.exports = {
  title: 'pnpm',
  path: '/NodeJS/pnpm/',
  children: [
    {
      title: '安装',
      path: '/NodeJS/pnpm/安装'
    },
    design,
    cli,
    miningPitGuide
  ]
};
