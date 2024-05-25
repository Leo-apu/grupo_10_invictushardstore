const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// const User = require('../models/User')

const bcryptjs = require('bcryptjs');

const controller = {
	index: (req, res) => {
		const user = req.session.userLogged;
		res.render('index', {user: user, products: products.results});
	},
	search: (req, res) => {
	},	

	register : async function (req, res){
		try{
			res.render('registro');
		}catch (error){
			console.log("Error", error);
		}
        
	},

	// proccesRegister: (req, res) => {

	// 	let userToCreate  = {
	// 		...req.body,
	// 		password: bcryptjs.hashSync(req.body.password, 10),
	// 		image: req.file?.filename || 'user-default.jpg',
	// 	}

	// 	User.create(userToCreate);
	// 	return res.redirect('/users/login')

	// },
	processRegister:  async function (req, res) {
		const resultValidation = validationResult(req); 
		try {

			  const existingUser = await db.User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.render('registro', { errors: { email: { msg: 'El correo electrónico ya está registrado' } }, oldData: req.body });
        }
			
			await  db.User.create({
				...req.body,
				img: req.file.filename,
				password: bcryptjs.hashSync(req.body.password, 10),
				
			})
			
			if(resultValidation.errors.length > 0){
				
				return res.render('registro' , {
					errors: resultValidation.mapped(),oldData: req.body});
					
				
			}
			return res.redirect('/users/login');
		} catch (error) {
			console.log("Error:", error);
		}
	},

	login: (req, res) => {
		res.render('login');
	},

	loginProcess: async (req, res) => {
		const resultValidation = validationResult(req); 
		try {

				if(resultValidation.errors.length > 0){
					console.log('error');
				return res.render('login' , {
					errors: resultValidation.mapped()});
					
			}
	


			let userToLogin = await db.User.findOne({ where: { email: req.body.email } });
	
			if (userToLogin) {
				let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (correctPassword) {
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
	
					if (req.body.remember) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 });
					}
	
					return res.redirect('/users/profile');
				}
	
				// return res.render('login', {
				// 	errors: {
				// 		password: {
				// 			msg: 'La contraseña es incorrecta'
				// 		}
				// 	}
				// });
			}

		
			// return res.render('login', {
			// 	errors: {
			// 		email: {
			// 			msg: 'No se encontró un usuario con este email'
			// 		}
			// 	}
			// });
		} catch (error) {
			console.log("Error:", error);
			return res.render('login', {
				errors: {
					email: {
						msg: 'Hubo un error al procesar el inicio de sesión'
					}
				}
			});
		}
	},
	

	logout : (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

	profile: async (req, res) => {
		try {
			// Obtener el ID del usuario de la sesión
			const userId = req.session.userLogged.id;
	
			// Buscar al usuario en la base de datos utilizando su ID
			const user = await db.User.findByPk(userId);
	
			if (user) {
				// Si se encuentra el usuario, renderizar la vista de perfil con los datos del usuario
				return res.render('profile', {
					user: user
				});
			} else {
				// Si no se encuentra el usuario, manejar el caso en consecuencia (por ejemplo, redirigir a una página de error)
				return res.status(404).send('Usuario no encontrado');
			}
		} catch (error) {
			console.log("Error:", error);
			// Manejar cualquier error que ocurra durante el proceso
			// Puedes renderizar una vista de error o redirigir a una página de error
			return res.status(500).send('Error interno del servidor');
		}
	},

	// editProfile: async function(req,res) {
	// 	try {
	// 		const User = await db.User.findByPk(req.params.id);
	// 		return res.render('profileEdit', { user });
	// 	} catch (error) {
	// 		console.log("Error:", error);
	// 	}
	// },
	
	editProfile: async function(req,res) {
		try {
			const user = await db.User.findByPk(req.params.id);
			

			return res.render('profileEdit',{ user })
		}catch (error){
			console.log("Error:", error);
		}
	},

	updateProfile: async function(req, res) {
		try {
			// Verifica si se ha cargado un nuevo archivo de imagen
			if (req.file) {
				// Actualiza el usuario con la nueva imagen
				await db.User.update({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					img: req.file.filename
				}, {
					where: { id: req.params.id }
				});
			} else {
				// Si no se ha cargado una nueva imagen, actualiza solo los otros campos
				await db.User.update({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email
				}, {
					where: { id: req.params.id }
				});
			}
	
			// Obtén el usuario actualizado de la base de datos
			const updatedUser = await db.User.findByPk(req.params.id);
	
			// Renderiza la vista del perfil con el usuario actualizado
			return res.render('profile', { user: updatedUser });
		} catch (error) {
			console.log("Error:", error);
			// Maneja el error de manera apropiada
		}
	}
	
	
	
	
};

module.exports = controller;