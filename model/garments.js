const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Garments = sequelize.define('Garments', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  garment_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(350),
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['size']
    },
    {
      fields: ['condition']
    },
    {
      fields: ['brand']
    },
    {
      fields: ['is_available']
    },
  ]
});


module.exports = Garments;