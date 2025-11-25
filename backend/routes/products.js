const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');

// Ruta para obtener información de un producto específico
router.get('/:id.json', ProductsController.getProduct);

module.exports = router;
