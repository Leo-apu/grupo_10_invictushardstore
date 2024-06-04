const db = require('../../database/models');

const controller = {
    async count(req, res) {
        try {
            const products = await db.Product.findAll({ include: ['category'] });
            const response = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products/count'
                }
            }
            res.send(response);
        } catch (error) {
            res.send(error)
        }
    },
    async countByCategory(req, res) {
        try {
            const categories = await db.Category.findAll(); 
            const categoryCounts = {};

            for (const category of categories) {
                const productsCount = await db.Product.count({ where: { category_id: category.id } });
                categoryCounts[category.name] = productsCount;
            }
                
            const response = {
                meta: {
                    status: 200,
                    categories: categoryCounts,
                    url: 'api/products/countByCategory'
                }
            }
            res.send(response);
        } catch (error) {
            res.send(error);
        }
    },
    async products(req, res) {
        try {
           
            const products = await db.Product.findAll({
                include: [{
                    model: db.Category,
                    as: 'category'
                }]
            });
    
            const formattedProducts = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    categories: product.category ? [product.category.name] : [], 
                    img : product.img,
                    detail: `/api/products/${product.id}`
                };
            });
    
            const response = {
                meta: {
                    status: 200,
                    url: 'api/products'
                },
                data: formattedProducts
            };
            
            res.send(response);
        } catch (error) {
            res.send(error);
        }
    },


}

module.exports = controller;