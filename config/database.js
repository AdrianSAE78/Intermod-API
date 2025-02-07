// DB_NAME=IntermodDB
// DB_USER=postgres
// DB_PASSWORD=12345
// DB_HOST=localhost
// DB_PORT=5432
// JWT_SECRET=tu_clave_secreta_jwt
// FIREBASE_PROJECT_ID=tu-project-id

require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
);

module.exports = sequelize;