const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let UserPreferences = sequelize.define('UserPreferences', {
  prefered_free_hours: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
  prefered_size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prefered_size_shoes: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: false,
  },
  prefered_style: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserPreferences;