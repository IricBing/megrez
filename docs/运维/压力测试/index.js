const ab = require('./ApacheBench');
const jmeter = require('./Jmeter');
const locust = require('./locust');
const go_stress_testing = require('./go_stress_testing');

module.exports = {
  title: '压力测试',
  children: [ab, jmeter, locust, go_stress_testing]
};
