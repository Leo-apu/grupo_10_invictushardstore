const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../models/indexProductData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		const user = req.session.userLogged;
		res.render('index', {user: user, products: products.results});
	},
	search: (req, res) => {
	},	
};

module.exports = controller;
