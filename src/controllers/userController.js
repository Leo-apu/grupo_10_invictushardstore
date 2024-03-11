const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const User = require('../models/User')

const bcryptjs = require('bcryptjs');

const controller = {

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

	
};

module.exports = controller;