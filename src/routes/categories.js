const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/categories', categoriesController.list);
router.get('/categories/detail/:id', categoriesController.detail);

module.exports = router;