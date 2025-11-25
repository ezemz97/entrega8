const express = require('express');
const router = express.Router();
const CatsController = require('../controllers/catsController');

// Ruta para obtener todas las categorías
router.get('/cat.json', CatsController.getCategories);

module.exports = router;
