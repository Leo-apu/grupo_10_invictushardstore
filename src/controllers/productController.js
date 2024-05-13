const fs = require('fs');
const path = require('path');
const cripto = require('crypto');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const productPathFile = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productPathFile,'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('products');
	},
	
	/**
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
	},
	*/
	

	// ------CRUD Sequelize---------

	'list': (req, res) => {
        db.Product.findAll({
            include: ['category']
        })
        .then(products => {
            res.render('listarProductos',{products})
        })
		.catch(error => {
			console.error('Error al buscar productos:', error);
		});
    },

	'detail': (req, res) => {
        db.Product.findByPk(req.params.id, {
			include: ['category'] // incluye la categoría asociada al producto
		})
            .then(product => {
                res.render('productDetail2', {product});
            });
    },

	// Create - Form to create
	create: async function (req, res) {
		try {
			const allCategories = await db.Category.findAll();
			console.log("---> " + allCategories);
			return res.render('crearProducto', { allCategories });
		} catch (error) {
			console.log("Error:", error);
		}
	},

	store: async function (req, res) {
		const resultValidation = validationResult(req);
		try {
			if (resultValidation.errors.length > 0) {
				const allCategories = await db.Category.findAll();
				return res.render('crearProducto', { allCategories, errors: resultValidation.mapped(), oldData: req.body });
			}
	
			await db.Product.create({
				...req.body,
				img: req.file.filename
			})
			return res.redirect('/products/prodList');
		} catch (error) {
			console.log("Error:", error);
		}
	},
	

	edit: async function(req,res) {
		try {
			const Product = await db.Product.findByPk(req.params.id,{
				include: ['category']
			});
			const allCategories = await db.Category.findAll()

			return res.render('productEdit',{ Product,allCategories })
		}catch (error){
			console.log("Error:", error);
		}
	},

    update: async function (req,res) {
		try {
           await db.Product.update({
               ...req.body
           },
           {
            where:{ id: req.params.id }
           })
           return res.redirect('/products/prodList')  
		}catch (error){
			console.log("Error:", error);
		}
    },
	/**
    delete: async function (req,res) {
        try{ 
            const Product = await db.Product.findByPk(req.params.id);            
            return res.render('productDelete', {Product})
        }catch (error){
			console.log("Error:", error);
		}   
    },*/

    destroy: async function (req,res) {
        try{ 
            await db.Product.destroy({
                where:{ id: req.params.id }
            })
            return res.redirect('/products/prodList')
        }catch (error){
			console.log("Error:", error);
		}

    }
	

};

module.exports = controller;