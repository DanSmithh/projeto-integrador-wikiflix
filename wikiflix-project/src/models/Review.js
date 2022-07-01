module.exports = (sequelize, dataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    usuario_id: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
  
    id_filme: {
      type: dataTypes.STRING,
      allowNull: false
    },

    review: {
      type: dataTypes.STRING,
      allowNull: false
    }

  }, {
    tableName: 'reviews',
    timestamps: true
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    })
  }
  

  return Review;
};