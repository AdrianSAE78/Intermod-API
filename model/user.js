const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

let Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firebase_uid: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    trust_score: {
        type: DataTypes.FLOAT,
        defaultValue: 5.0,
        validate: {
            min: 0.0,
            max: 5.0
        }
    },
    user_type: {
        type: DataTypes.ENUM('usuario', 'administrador'),
        defaultValue: 'usuario',
    },
    liter_counter: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    no_show_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    block_until: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['username'],
        },
        {
            unique: true,
            fields: ['email'],
        },
    ],
})


module.exports = Users;