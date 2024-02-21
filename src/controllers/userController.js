const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	login: (req, res) => {
		res.render('login');
	},
	register : (req, res) => {
        res.render('registro');
	},	
};

module.exports = controller;