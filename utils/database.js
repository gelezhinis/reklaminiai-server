const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reklaminiai', 'root', 'root', {
  dialect: 'mysql',
  // host: '194.31.55.158',
  host: 'localhost',
  dialectModule: require('mysql2')
});

module.exports = sequelize;