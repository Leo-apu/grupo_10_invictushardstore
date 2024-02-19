const fs = require('fs');
const path = require('path');
const data = require('../models/indexProductData.json'); 

const controller = {
	index: (req, res) => {
		res.render('index', {products: data.results});
	},
	search: (req, res) => {
	},	
};

module.exports = controller;
