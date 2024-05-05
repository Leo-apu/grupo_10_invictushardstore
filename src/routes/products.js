const express = require('express');
const router = express.Router();


const multer = require('multer');
const path = require('path');

// ************ Multer ************
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images/productsBD'));
    },
    filename:(req,file,cb) => {
        const newFilename = 'prod-bd-'+ Date.now() + path.extname(file.originalname);
        cb(null,newFilename);
    }
});

//ejecucion de multer
const upload = multer({storage});
// ************ ------ ************


const productsController = require('../controllers/productController');


router.get('/', productsController.index); 


//router.get('/create/', productsController.create); 
//router.post('/create/', productsController.store); 

//router.get('/cart/', productsController.cart);

//router.get('/detail/:id', productsController.detail); 


//router.get('/edit/:id', productsController.edit); 
//router.put('/edit/:id', productsController.update); 


//router.delete('/:id', productsController.destroy); 
//router.get('/list',productsController.list); 



//rutas exigidas para la creacion del crud

router.get('/prodList', productsController.list);
router.get('/detail/:id', productsController.detail);

router.get('/create/', productsController.create);
router.post('/create/',upload.single('img'), productsController.store); 

router.get('/edit/:id', productsController.edit);
router.post('/update/:id', productsController.update);

//router.get('/delete/:id', productsController.delete);
router.post('/delete/:id', productsController.destroy);


module.exports = router;
