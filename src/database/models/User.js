/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/type').DataTypes} dataTypes 
 * @returns 
 */
module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
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
    roles_id: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    img: {
      type: dataTypes.STRING // Puedes ajustar el tipo de datos según tus necesidades
    }
  }; 
  let config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    tableName: 'users'
  }
   
  const User = sequelize.define(alias, cols, config);
  
  // Relación uno a muchos
  User.associate = function (models) {
       
    User.belongsTo(models.Rol, {
      as: 'rol',
      foreignKey: 'roles_id' 
    })
  }
  
  return User;
};
