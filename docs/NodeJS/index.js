const pm2 = require('./pm2');
const npm = require('./npm');

module.exports = {
  title: 'NodeJS',
  children: [npm, pm2]
};
