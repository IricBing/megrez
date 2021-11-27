const typeorm = require('./TypeORM');
const mikroorm = require('./MikroORM');
const prisma = require('./Prisma');
const mongoose = require('./Mongoose');

module.exports = {
  title: '数据库',
  children: [typeorm, mikroorm, prisma, mongoose]
};
