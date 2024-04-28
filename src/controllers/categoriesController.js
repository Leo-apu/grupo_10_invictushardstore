const db = require('../database/models');
const sequelize = db.sequelize;

const categoriesController = {
    'list': (req, res) => {
        db.Category.findAll()
            .then(categories => {
                res.render({categories})
            })
    },
    'detail': (req, res) => {
        db.Category.findByPk(req.params.id)
            .then(category=> {
                res.render('modificarProducto.ejs', {category});
            });
    }
   

}

module.exports = categoriesController;
