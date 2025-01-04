const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Exchange = sequelize.define('Exchange', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'En proceso',
      validate: {
        isIn: [['Agendado', 'En proceso', 'Entregado', 'Imposible entregar', 'Cancelado']],
      },
    },
    suggested_location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Patio Central PUCE',
    },
    match_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  
module.exports = Exchange;