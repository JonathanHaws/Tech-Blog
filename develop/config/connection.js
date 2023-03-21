require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDATABASE_URL
  ? new Sequelize(process.env.JAWSDATABASE_URL)
  : new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

