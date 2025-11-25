const express = require('express');
const router = express.Router();
const UserCartController = require('../controllers/userCartController');

// Ruta para obtener el carrito de un usuario específico
router.get('/:id.json', UserCartController.getUserCart);

module.exports = router;
