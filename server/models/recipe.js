module.exports = (sequelize, DataTypes) => {

  const Recipe = sequelize.define('recipe', {
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

  Recipe.associate = function associate(models) {
    Recipe.belongsTo(models.category);
    Recipe.belongsTo(models.user);
  };

  return Recipe;
};