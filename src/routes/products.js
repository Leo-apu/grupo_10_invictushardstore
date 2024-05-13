const express = require('express');
const router = express.Router();


const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

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
let validationsProduct = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 5 }).withMessage('El nombre de producto debe tener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('El apellido es obligatorio').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    
    
    // Imagen
    body('img').custom((value, { req }) => {
        let file =req.file;
        let acceptedExtensions = ['.jpg','.png' ,'.gif' , 'jpeg']
      
        if (!file) {
            throw new Error('Seleccione una imagen');
        }else{
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error('Seleccione un archivo de imagen válido (jpg, jpeg, png, gif)')
            }
        }

      
        return true;
    })
];


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
router.post('/create/',upload.single('img'), validationsProduct , productsController.store); 

router.get('/edit/:id', productsController.edit);
router.post('/update/:id', productsController.update);

//router.get('/delete/:id', productsController.delete);
router.post('/delete/:id', productsController.destroy);


module.exports = router;
