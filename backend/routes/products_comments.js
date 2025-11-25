const express = require('express');
const router = express.Router();
const ProductsCommentsController = require('../controllers/productsCommentsController');

// Ruta para obtener comentarios de un producto específico
router.get('/:id.json', ProductsCommentsController.getProductComments);

module.exports = router;
