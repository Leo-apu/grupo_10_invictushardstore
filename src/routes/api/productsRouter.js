const express = require('express');
const router = express.Router();

const productsController = require('../../controllers/api/productsController');


router.get('/count', productsController.count);
router.get('/countByCategory', productsController.countByCategory);
router.get('/prod', productsController.products);



module.exports = router;