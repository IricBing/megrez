const _if = require('./IF');
const _foreach = require('./FOREACH');
const _while = require('./WHILE');

module.exports = {
  title: '控制指令',
  children: [_if, _foreach, _while]
};
