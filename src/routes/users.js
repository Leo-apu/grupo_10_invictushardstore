const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');

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


router.get('/login', userController.login); 

router.get('/register', userController.register); 
router.post('/register', upload.single('image'), userController.proccesRegister);

module.exports = router;