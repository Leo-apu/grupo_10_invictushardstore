const path = require('node:path');
const data = require('../models/indexProductData.json'); 

const controller =  {
    renderIndex: (req,res)  =>{
        res.render('index',{
            products: data.results
        })
    }
}

module.exports = controller;