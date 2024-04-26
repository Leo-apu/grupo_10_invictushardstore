module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  // Relación muchos a uno
  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, { foreignKey: 'subcategories_id' });
    };
    return SubCategory;
  };