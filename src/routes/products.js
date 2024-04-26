const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');


router.get('/', productsController.index); 


router.get('/create/', productsController.create); 
router.post('/create/', productsController.store); 

router.get('/cart/', productsController.cart);

router.get('/detail/:id', productsController.detail); 


router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


router.delete('/:id', productsController.destroy); 
router.get('/list',productsController.list);

//rutas exigidas para la creacion del crud
//router.get('/products/add', productsController.add); 
//router.delete('/products/create', productsController.create); 

module.exports = router;
