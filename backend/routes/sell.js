const express = require('express');
const router = express.Router();
const SellController = require('../controllers/sellController');

// Ruta para obtener información de publicación
router.get('/publish.json', SellController.getPublishInfo);

module.exports = router;
