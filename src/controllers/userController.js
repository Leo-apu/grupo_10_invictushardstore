const fs = require('fs');
const path = require('path');

const controller = {
	login: (req, res) => {
		res.render('login');
	},
	register : (req, res) => {
        res.render('registro');
	},	
};

module.exports = controller;