/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/type').DataTypes} dataTypes 
 * @returns 
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'Rol';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    }
  };
  let config = {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
  }
  
  const Rol = sequelize.define(alias, cols, config);

  // Relación uno a muchos
  Rol.associate = function (models){

    Rol.hasMany(models.User,{
      as: 'users',
      foreignKey: 'roles_id' 
    })
  }

  return Rol;
}

  


