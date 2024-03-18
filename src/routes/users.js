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
        const newFilename = 'user-'+ Date.now() + path.extname(file.originalname);
        cb(null,newFilename);
    }
});

const upload = multer({storage});
// ************ ------ ************


router.get('/login', guestMiddleware, userController.login); 
router.get('/profile', authMiddleware, userController.profile);
router.post('/login', userController.loginProcess);
router.get('/register', guestMiddleware, userController.register); 
router.post('/register', upload.single('image'), userController.proccesRegister);
router.get('/logout', userController.logout); 

module.exports = router;