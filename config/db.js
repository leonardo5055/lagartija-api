// config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Asegúrate de tener tus variables de entorno

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'gkIaoyPJUuPucKsXqJimsyRSnjPmQTmL',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 40588
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
