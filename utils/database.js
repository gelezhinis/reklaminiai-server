const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reklaminiai', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  dialectModule: require('mysql2')
});

module.exports = sequelize;