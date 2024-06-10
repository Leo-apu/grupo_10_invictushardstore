const fs = require('fs');
const path = require('path');
const cripto = require('crypto');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const notifier = require('node-notifier');
const iconPath = path.join(__dirname, '../../public/images/invictusNotification.png');

const productPathFile = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productPathFile,'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('products');
	},
	


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
			include: ['category'] 
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

			const message = `PRODUCTO \nNombre: ${req.body.name} \nID: ${req.params.id} \n Creado exitosamente`;
            notifier.notify({
				title: 'InvictusHardStore',
				message: message,
				icon: iconPath, 
				sound: true, 
                appID: 'Notificacion',
                timeout: 5000,
            });

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
		console.log('id a modificar : ',req.params.id);
		try {
			if (req.file) {
				await db.Product.update({
					...req.body,
					img: req.file.filename
				},{
					where:{ id: req.params.id }
				})
			}else{
				await db.Product.update({
					...req.body
				},{
					where:{ id: req.params.id }
				})
			}
			const message = 'PRODUCTO \nNombre: '+  req.body.name + '\nID: ' + req.params.id + '\nModificado exitosamente';
			notifier.notify({
				title: 'InvictusHardStore',
				message: message,
				icon: iconPath, 
				sound: true, 
                appID: 'Notificacion',
                timeout: 5000,
            });
           return res.redirect('/products/prodList')  
		}catch (error){
			console.log("Error:", error);
		}
    },

    destroy: async function (req,res) {
        try{ 
            await db.Product.destroy({
                where:{ id: req.params.id }
            })

			const message = 'PRODUCTO \nNombre: '+  req.body.name + '\nID: ' + req.params.id + '\nEliminado exitosamente';
			notifier.notify({
				title: 'InvictusHardStore',
				message: message,
				icon: iconPath, 
				sound: true, 
                appID: 'Notificacion',
                timeout: 5000,
            });
            return res.redirect('/products/prodList')
        }catch (error){
			console.log("Error:", error);
		}

    },
	search: async function (req,res) {
        try{ 
			const searchTerm = req.query.name;

			const products = await db.Product.findAll({
				where: {
					name: {
						[db.Sequelize.Op.like]: `%${searchTerm}%`
					}
				},
				include: ['category']
			});

			res.render('prodListSearch', { products });
        }catch (error){
			console.log("Error:", error);
		}
    }
};

module.exports = controller;