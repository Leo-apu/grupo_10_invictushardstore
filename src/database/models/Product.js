/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/type').DataTypes} dataTypes 
 * @returns 
 */
module.exports = (sequelize, dataTypes) => {
  let alias = 'Product';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: dataTypes.FLOAT,
      allowNull: false
    },
    discount: {
      type: dataTypes.FLOAT,
      allowNull: true
    },
    img: {
      type: dataTypes.STRING,
      allowNull: true
    },
    categories_id: {
      type: dataTypes.INTEGER,
      allowNull: false
    }
  };
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }

  const Product = sequelize.define(alias, cols, config);
    
  // Relación muchos a uno
  Product.associate = function(models){
    
    Product.belongsTo(models.Category,{
      as: 'category',
      foreignKey: 'categories_id' 
    })
  }
  
  return Product;
};