const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../models/indexProductData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('index', {products: products.results});
	},
	search: (req, res) => {
	},	
};

module.exports = controller;
