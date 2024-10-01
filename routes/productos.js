const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos con sus imágenes
router.get('/', (req, res) => {
    const query = `
        SELECT p.*, i.imagen_url 
        FROM Productos p
        LEFT JOIN ImagenesProducto i ON p.id_producto = i.producto_id;
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Agregar un nuevo producto y su(s) imagen(es)
router.post('/', (req, res) => {
    const { nombre, descripcion, precio_actual, precio_antes, stock, categoria_id, imagenes } = req.body;

    const productoQuery = `
        INSERT INTO Productos (nombre, descripcion, precio_actual, precio_antes, stock, categoria_id, fecha_creacion, fecha_actualizacion) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    db.query(productoQuery, [nombre, descripcion, precio_actual, precio_antes, stock, categoria_id], (err, productoResult) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        const productoId = productoResult.insertId;
        if (imagenes && imagenes.length > 0) {
            const imagenQuery = `
                INSERT INTO ImagenesProducto (producto_id, imagen_url, fecha_creacion, fecha_actualizacion)
                VALUES ?
            `;
            const imagenesData = imagenes.map(url => [productoId, url, new Date(), new Date()]);

            db.query(imagenQuery, [imagenesData], (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ message: 'Producto e imágenes agregados', id_producto: productoId });
            });
        } else {
            res.json({ message: 'Producto agregado sin imágenes', id_producto: productoId });
        }
    });
});

module.exports = router;
