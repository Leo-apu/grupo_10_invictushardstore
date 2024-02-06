const path = require('node:path');

const controller =  {
    renderIndex: (req,res)  =>{
        res.render('index')
    }
}

module.exports = controller;