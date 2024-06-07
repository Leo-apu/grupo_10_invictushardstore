module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    });
  
    CartItem.associate = function(models) {
      CartItem.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
      });
    };
  
    return CartItem;
  };