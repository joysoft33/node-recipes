module.exports = (sequelize, DataTypes) => {

  const category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  category.associate = (models) => {};

  return category;
};