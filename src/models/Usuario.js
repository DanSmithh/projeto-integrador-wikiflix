module.exports = (sequelize, dataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    nome: {
      type: dataTypes.STRING,
      allowNull: false
    },

    sobrenome: {
      type: dataTypes.STRING,
      allowNull: false
    },

    email: {
      type: dataTypes.STRING,
      allowNull: false
    },

    id_hash: {
      type: dataTypes.STRING,
      allowNull: false
    },

    senha: {
    type: dataTypes.STRING,
    allowNull: false
    }
    

  }, {
    tableName: 'usuario',
    timestamps: true
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Review, {
      foreignKey: 'usuario_id',
      as: 'reviews'
    })
  }

  return Usuario;
}