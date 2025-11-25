const express = require('express');
const router = express.Router();
const CatsProductsController = require('../controllers/catsProductsController');

// Ruta para obtener productos de una categoría específica
router.get('/:id.json', CatsProductsController.getCategoryProducts);

module.exports = router;
