/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/type').DataTypes} dataTypes 
 * @returns 
 */
module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    last_name: {
      type: dataTypes.STRING,
      allowNull: false
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false
    },
    rol_id: {
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
   
  const User = sequelize.define(alias, cols, config);
  
  // Relación uno a muchos
  User.associate = function (models) {
       
    User.belongsTo(models.Rol, {
      as: 'rol',
      foreignKey: 'rol_id' 
    })
  }
  
  return User;
};