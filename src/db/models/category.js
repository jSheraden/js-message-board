'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Forum, { foreignKey: 'categoryId' });
      }
    }
  });
  return Category;
};
