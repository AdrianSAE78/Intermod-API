const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Scores = sequelize.define('Scores', {
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    rating_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

module.exports = Scores;