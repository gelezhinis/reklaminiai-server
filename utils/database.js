const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reklaminiai', 'root', 'meidaNatas200', {
  dialect: 'mysql',
  host: '194.31.55.158',
  // host: 'localhost',
  port: '/var/run/mysqld/mysqld.sock',
  dialectModule: require('mysql2')
});

module.exports = sequelize;