const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const sequelize = require('./config/database');
const userRoutes = require('./view/userRoutes');
const scoreRoutes = require('./view/scoreRoutes');
const garmentRoutes = require('./view/garmentRoutes');
const exchangeRoutes = require('./view/exchangeRoutes');
const categoriesRoutes = require('./view/categoriesRoutes');
const userPreferencesRoutes = require('./view/userPreferencesRoutes');
const path = require('path');


const app = express();
let port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', userRoutes);
app.use('/api', scoreRoutes);
app.use('/api', garmentRoutes);
app.use('/api', exchangeRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', userPreferencesRoutes);

sequelize.sync().then(() => {
    console.log('Base de Datos Conectada!');
    app.listen(port, () => {
        console.log("El servidor ha iniciado en el puerto " + port);
    });
}).catch(error => console.error('Error Conectando la base de datos:', error));
