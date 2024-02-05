const path = require('node:path');
const express = require('express');
const router = express.Router();
const crearProductoController = require('../controllers/crearProductoController');

router.get('/products/crearProducto', crearProductoController.renderCrearProducto);

module.exports = router;