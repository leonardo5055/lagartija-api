const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos
router.get('/', (req, res) => {
    db.query('SELECT * FROM Productos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const { nombre, descripcion, precio_actual, precio_antes, stock, categoria_id } = req.body;
    const query = 'INSERT INTO Productos (nombre, descripcion, precio_actual, precio_antes, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio_actual, precio_antes, stock, categoria_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Producto agregado', id: results.insertId });
    });
});

module.exports = router;
