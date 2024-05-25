const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddlewares');
const authMiddleware = require('../middlewares/authMiddleware'); 

const { body } = require('express-validator');

// ************ Multer ************
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images/users'));
    },
    filename:(req,file,cb) => {
        const newFilename = 'user-bd-'+ Date.now() + path.extname(file.originalname);
        cb(null,newFilename);
    }
});

//ejecucion de multer
const upload = multer({storage});
// ************ ------ ************

let validationsRegister = [
    body('first_name').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').isEmail().withMessage('El correo electrónico no es válido'),    
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
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

/*LEER EL FORMULARIO DE LOGIN, Y ENVIAR EL FORMULARIO DE LOGIN */
router.get('/login', guestMiddleware, userController.login); 
router.post('/login', validationsRegister, userController.loginProcess);

/*TRAER UN USUARIO Y MOSTRAR SUS DETALLES*/
router.get('/profile', authMiddleware, userController.profile);
router.get('/profile/edit/:id', authMiddleware, userController.editProfile);
router.put('/profile/update/:id', upload.single('img'), authMiddleware, userController.updateProfile);


/*TRAER FORMULARIO DE REGISTRO, ENVIAR DATOS DEL FORMULARIO DE REGISTRO */
router.get('/register', guestMiddleware, userController.register); 
// router.post('/register', upload.single('img'), userController.proccesRegister); /*CREAR */
router.post('/register', upload.single('img'), validationsRegister, userController.processRegister);

router.get('/logout', userController.logout); 

module.exports = router;