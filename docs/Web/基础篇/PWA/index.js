const workbox = require('./workbox');
const serviceWorker = require('./ServiceWorker');

module.exports = {
  title: 'PWA',
  path: '/Web/基础篇/PWA/',
  children: [serviceWorker, workbox]
};
