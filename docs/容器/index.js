const docker = require('./Docker');
const kubernetes = require('./Kubernetes');

module.exports = {
  title: '容器',
  children: [docker, kubernetes]
};
