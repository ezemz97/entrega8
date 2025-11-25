const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/registerController');

// Endpoint POST /register
router.post('/', RegisterController.register);

module.exports = router;
