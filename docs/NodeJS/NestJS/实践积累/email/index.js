const nodemailer = require('./nodemailer');
const node_mailjet = require('./node_mailjet');

module.exports = {
  title: 'E-mail',
  path: '/NodeJS/NestJS/实践积累/email/',
  children: [nodemailer, node_mailjet]
};
