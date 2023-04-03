const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subcategory: Sequelize.STRING,
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price3: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price4: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price5: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price6: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.JSON,
    allowNull: false
  },
  description: Sequelize.STRING
});

module.exports = Product;