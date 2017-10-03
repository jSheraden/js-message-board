export default (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {});

  return Category;
};
