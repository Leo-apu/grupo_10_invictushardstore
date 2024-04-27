const db = require('../database/models');
const sequelize = db.sequelize;

const categoriesController = {
    'list': (req, res) => {
        db.Category.findAll()
            .then(categories => {
                res.render('crearProducto.ejs', {categories})
            })
    },
    'detail': (req, res) => {
        db.Category.findByPk(req.params.id)
            .then(categories => {
                res.render('modificarProducto.ejs', {categories});
            });
    }
   

}

module.exports = categoriesController;
