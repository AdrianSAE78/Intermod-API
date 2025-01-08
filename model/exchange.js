const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Exchange = sequelize.define('Exchange', {
  status: {
    type: DataTypes.ENUM('pendiente', 'completado', 'rechazado'),
    defaultValue: 'pendiente',
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
  schedule_date: {
    type: DataTypes.DATE
  },
  confirmed_by_sender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  confirmed_by_receiver: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  penalty_applied: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['match_date']
    },
  ]
});

module.exports = Exchange;