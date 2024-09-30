// index.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.DB_PORT || 3000;
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const db = require('./config/db'); // Asegúrate de que la conexión a la DB esté aquí

// Middleware para leer datos JSON
app.use(express.json());
app.use(cors());

// Verificar la conexión a la base de datos antes de iniciar
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        process.exit(1); // Terminar el proceso si no hay conexión
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
