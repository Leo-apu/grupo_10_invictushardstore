module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true
      },
      categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    // Relación muchos a uno
    Product.associate = (models) => {
      Product.belongsTo(models.Category, { foreignKey: 'categories_id' });

    };
  
    return Product;
  };