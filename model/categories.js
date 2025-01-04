const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Categories = sequelize.define('Categories', {
    categorie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
  
module.exports = Categories;