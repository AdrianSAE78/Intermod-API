const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    trust_score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'usuario',
    },
    liter_counter: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
})


module.exports = Users;