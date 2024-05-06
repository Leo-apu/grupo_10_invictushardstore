const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddlewares');
const authMiddleware = require('../middlewares/authMiddleware'); 

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

/*LEER EL FORMULARIO DE LOGIN, Y ENVIAR EL FORMULARIO DE LOGIN */
router.get('/login', guestMiddleware, userController.login); 
router.post('/login', userController.loginProcess);

/*TRAER UN USUARIO Y MOSTRAR SUS DETALLES*/
router.get('/profile', authMiddleware, userController.profile);
router.get('/profile/edit/:id', authMiddleware, userController.editProfile);
router.put('/profile/update/:id', upload.single('img'), authMiddleware, userController.updateProfile);


/*TRAER FORMULARIO DE REGISTRO, ENVIAR DATOS DEL FORMULARIO DE REGISTRO */
router.get('/register', guestMiddleware, userController.register); 
// router.post('/register', upload.single('img'), userController.proccesRegister); /*CREAR */
router.post('/register', upload.single('img'), userController.processRegister);

router.get('/logout', userController.logout); 

module.exports = router;