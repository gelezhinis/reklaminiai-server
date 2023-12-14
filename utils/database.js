require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reklaminiai', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  // port: '/var/run/mysqld/mysqld.sock',
  dialectModule: require('mysql2')
});

module.exports = sequelize;
