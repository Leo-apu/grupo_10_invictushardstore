module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    });
  
    Cart.associate = function(models) {
      Cart.hasMany(models.CartItem, {
        as: 'items',
        foreignKey: 'cart_id'
      });
    };
  
    return Cart;
  };