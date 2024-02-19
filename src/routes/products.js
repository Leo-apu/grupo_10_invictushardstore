const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');


router.get('/', productsController.index); 


router.get('/create/', productsController.create); 
router.post('/', productsController.store); 

router.get('/cart/', productsController.cart);

router.get('/detail/', productsController.detail); 


router.get('/edit', productsController.edit); 
router.put('/:id', productsController.update); 


router.delete('/:id', productsController.destroy); 


module.exports = router;
