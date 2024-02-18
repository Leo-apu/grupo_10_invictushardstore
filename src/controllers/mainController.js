const fs = require('fs');
const path = require('path');

const controller = {
	index: (req, res) => {
		res.render('index');
	},
	search: (req, res) => {
	},	
};

module.exports = controller;
