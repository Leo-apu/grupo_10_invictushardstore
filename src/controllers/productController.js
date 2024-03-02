const fs = require('fs');
const path = require('path');
const cripto = require('crypto');

const productPathFile = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productPathFile,'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('products');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId = req.params.id;
        const product = products.find(product => product.id === productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('productDetail', { product, pageTitle: product.name });
	},

	// list 
	list: (req, res) => {
		res.render('listarProductos',{products});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('crearProducto');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const { name, description, category , price  } = req.body;

		let priceNumber = parseFloat(price);

		const newProduct = {
			id : cripto.randomUUID(),
			name,
			description,
			category,
			price : priceNumber

		};

		console.log(newProduct);

		products.push(newProduct);

		fs.writeFileSync(productPathFile, JSON.stringify(products, null, 2));

		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productId = req.params.id;
		const productToEdit = products.find(product => product.id === productId);
		res.render('modificarProducto', { productToEdit });
	},

	// Update - Method to update
	update: (req, res) => {
		const productId = req.params.id;
		const productToUpdateIndex = products.findIndex(product => product.id === productId);
		console.log(productToUpdateIndex);
		if (productToUpdateIndex === -1) {
			return res.status(404).send('Product not found');
		}
	
		const updatedProductData = req.body;
		
		products[productToUpdateIndex] = { ...products[productToUpdateIndex], ...updatedProductData };
	
		fs.writeFileSync(productPathFile, JSON.stringify(products, null, 2));
		return res.redirect('/products/list');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productId = req.params.id;
		const productToDeleteIndex = products.findIndex(product => product.id === productId);

		products.splice(productToDeleteIndex, 1);

		fs.writeFileSync(productPathFile, JSON.stringify(products, null, 2));

		return res.redirect('/products/list');
	},

	cart: (req, res) => {
		return res.render('productCart');
	}
};

module.exports = controller;