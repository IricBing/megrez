const aptKeyDeprecation = require('./AptKeyDeprecation');
const gpgError = require('./GPGerror');

module.exports = {
  title: 'apt',
  children: [aptKeyDeprecation, gpgError]
};
