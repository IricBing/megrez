const nodejs = require('./NodeJS');
const python = require('./Python');
const csharp = require('./CSharp');

module.exports = {
  title: 'SDK',
  children: [nodejs, python, csharp]
};
