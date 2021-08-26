const lora = require('./LoRa');
const catM = require('./Cat-M');
const nbIot = require('./NB-Iot');

module.exports = {
  title: '物联网',
  children: [lora, catM, nbIot]
};
