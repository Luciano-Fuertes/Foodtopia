const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    highlights: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthyLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cookingSteps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
