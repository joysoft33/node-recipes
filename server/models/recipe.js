module.exports = (sequelize, DataTypes) => {

  const recipe = sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 12
      }
    }
  });

  recipe.associate = (models) => {
    recipe.belongsTo(models.category);
  };

  return recipe;
};