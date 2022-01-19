const experience = require('./实践积累');
const fiber = require('./Fiber');
const environment = require('./环境篇');
const project = require('./工程篇');

module.exports = {
  title: 'Go',
  children: [project, environment, fiber, experience]
};
