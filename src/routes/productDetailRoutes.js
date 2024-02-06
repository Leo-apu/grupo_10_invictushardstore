const path = require('node:path');
const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetailController');

router.get('/products/productDetail', productDetailController.renderProductDetail);

module.exports = router;