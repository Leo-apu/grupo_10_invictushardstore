module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
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
  
// Relación uno a muchos
  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, { foreignKey: 'roles_id' });
};

    return Rol;
};