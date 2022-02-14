const advance = require('./进阶');

module.exports = {
  title: '容器镜像篇',
  children: [
    {
      title: '构建Docker镜像',
      path: '/NodeJS/NestJS/容器镜像篇/构建Docker镜像'
    },
    {
      title: '构建Docker镜像（多阶段构建）基于yarn',
      path: '/NodeJS/NestJS/容器镜像篇/构建Docker镜像_多阶段构建'
    },
    {
      title: '构建Docker镜像（多阶段构建）基于pnpm',
      path: '/NodeJS/NestJS/容器镜像篇/构建Docker镜像_多阶段构建pnpm'
    },
    advance
  ]
};
