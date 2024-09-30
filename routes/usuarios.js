// usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que la ruta es correcta

// Obtener todos los usuarios
router.get('/', (req, res) => {
    console.log("GET /api/usuarios llamado"); // Log para confirmar la llamada
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err.message); // Log de error más detallado
            return res.status(500).json({ error: 'Error en la base de datos', detalles: err.message });
        }
        res.json(results);
    });
});

// Agregar un nuevo usuario
router.post('/', (req, res) => {
    console.log("POST /api/usuarios llamado"); // Log para confirmar la llamada
    const { correo, contraseña } = req.body; // Solo obtenemos correo y contraseña

    // Validar que se reciban los datos requeridos
    if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Faltan datos requeridos: correo y contraseña son obligatorios.' });
    }

    const query = 'INSERT INTO Usuarios (correo, contraseña) VALUES (?, ?)';
    db.query(query, [correo, contraseña], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err.message); // Log de error más detallado
            return res.status(500).json({ error: 'Error en la base de datos', detalles: err.message });
        }
        res.json({ message: 'Usuario agregado con éxito', id: results.insertId });
    });
});


module.exports = router;
