const path = require('node:path');
const express = require('express');
const router = express.Router();
const modificarProductoController = require('../controllers/modificarProductoController');

router.get('/products/modificarProducto', modificarProductoController.renderModificarProducto);

module.exports = router;