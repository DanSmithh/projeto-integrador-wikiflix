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
    },
    

  }, {
    tableName: 'usuario',
    timestamps: false
  });

  return Usuario;
}