module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Category.associate = function associate(models) {
    Category.hasMany(models.recipe);
  };

  return Category;
};