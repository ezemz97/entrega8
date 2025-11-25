const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Ruta para obtener información del carrito
router.get('/buy.json', CartController.getCart);

module.exports = router;
