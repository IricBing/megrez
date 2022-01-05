const cors = require('./cors');
const csrf = require('./csrf');

module.exports = {
  title: '中间件',
  children: [cors, csrf]
};
