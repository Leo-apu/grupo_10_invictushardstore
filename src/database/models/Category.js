module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subcategories_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    Category.associate = models => {
        // Relación muchos a muchos con Product
        Category.belongsToMany(models.SubCategory, {foreignKey: 'subcategories_id'});
    };
    Category.associate = (models) => {
      Category.belongsTo(models.Product, { foreignKey: 'categories_id' });

    };
    return Category;
  };