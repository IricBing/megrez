const buildDockerImage = require('./构建Docker镜像');
const buildDockerImageDrone = require('./构建Docker镜像Drone');

module.exports = {
  title: '容器镜像篇',
  children: [buildDockerImage, buildDockerImageDrone]
};
