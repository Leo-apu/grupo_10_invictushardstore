module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
        },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roles_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    // Relación uno a muchos
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Rol, { foreignKey: 'roles_id' });
    };
  
    return User;
  };