const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

// Ruta para obtener información del carrito (pública o protegida según lógica de negocio, aquí parece pública/mock)
router.get('/buy.json', CartController.getCart);

// Ruta para procesar la compra (protegida)
router.post('/', authMiddleware, CartController.createCart);

module.exports = router;
