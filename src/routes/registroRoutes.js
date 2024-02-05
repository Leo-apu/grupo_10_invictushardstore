const path = require('node:path');
const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

router.get('/Users/registro', registroController.renderRegistro);

module.exports = router;