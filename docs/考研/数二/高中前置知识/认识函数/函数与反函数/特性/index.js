const boundedness = require('./有界性');
const monotonicity = require('./单调性');
const parity = require('./奇偶性');

module.exports = {
  title: '特性',
  children: [boundedness, monotonicity, parity]
};
