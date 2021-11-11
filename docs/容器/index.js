const docker = require('./Docker');
const kubernetes = require('./Kubernetes');
const k3s = require('./k3s');

module.exports = {
  title: '容器',
  children: [docker, kubernetes, k3s]
};
