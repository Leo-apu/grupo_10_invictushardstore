const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const User = require('../models/User')

const bcryptjs = require('bcryptjs');

const controller = {
	index: (req, res) => {
		const user = req.session.userLogged;
		res.render('index', {user: user, products: products.results});
	},
	search: (req, res) => {
	},	

	register : (req, res) => {
        res.render('registro');
	},

	proccesRegister: (req, res) => {

		let userToCreate  = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename,
		}

		User.create(userToCreate);
		return res.redirect('/users/login')

	},

	login: (req, res) => {
		res.render('login');
	},

	loginProcess: (req,res) =>{
		let userToLogin = User.findByField('email',req.body.email);

		if(userToLogin){
			//Defini una variable que almacena la comparación de lo que viene por el req, y la clave hasheada
			let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
			if(correctPassword){
				delete userToLogin.password;
				req.session.userLogged = userToLogin;
				return res.redirect('/users/profile')
				
			}

			return res.render('login' , {
				errors: {
					password: {
						msg: 'La contraseña es incorrecta'
					}
				}
			})

		}
		return res.render('login' , {
			errors: {
				email: {
					msg: 'No se encontró un usuario con este email'
				}
			}
		})
	},

	profile: (req,res) =>{
		
		return res.render('profile' , {
			user: req.session.userLogged
		});
	},
	
};

module.exports = controller;