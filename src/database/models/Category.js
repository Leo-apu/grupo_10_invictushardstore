/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/type').DataTypes} dataTypes 
 * @returns 
 */
module.exports = (sequelize, dataTypes) => {
  let alias = 'Category';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false
    }
  };
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
  }
  
  const Category = sequelize.define(alias, cols, config);

  Category.associate = function(models) {
    
    Category.hasMany(models.Product,
      {as: 'product',
      foreignKey: 'category_id'  //alias_id
    })
  }
  
  return Category;
};