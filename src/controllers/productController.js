const fs = require('fs');
const path = require('path');

const controller = {
	index: (req, res) => {
		res.render('products');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
        res.render('productDetail');
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('crearProducto');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('modificarProducto');
	},

	// Update - Method to update
	update: (req, res) => {
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		return res.redirect('/products');
	},

	cart: (req, res) => {
		return res.render('productCart');
	}
};

module.exports = controller;