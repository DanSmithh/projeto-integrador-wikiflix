module.exports = (sequelize, dataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    usuarios_id: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
  
    id_filme: {
      type: dataTypes.STRING,
      allowNull: false
    },

    id_comentario_resposta: {
      type: dataTypes.INTEGER,
    },

    alteracao_dt: {
      type: dataTypes.DATE,
      allowNull: false
      },

      cadastro_dt: {
        type: dataTypes.DATE,
        allowNull: false
        }


  }, {
    tableName: 'comentarios',
    timestamps: false
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario, {
      foreignKey: 'usuarios_id',
      as: 'usuario'
    })
  }
  

  return Comentario;
};