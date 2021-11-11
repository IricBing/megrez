const kubeadm = require('./kubeadm');
const kubectl = require('./kubectl');

module.exports = {
  title: '命令篇',
  children: [kubeadm, kubectl]
};
