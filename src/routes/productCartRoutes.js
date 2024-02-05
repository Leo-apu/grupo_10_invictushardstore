const path = require('node:path');
const express = require('express');
const router = express.Router();
const productCartController = require('../controllers/productCartController');

router.get('/productCart', productCartController.renderProductCart);

module.exports = router;