const path = require('node:path');
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/Users/login', loginController.renderLogin);

module.exports = router;