'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Thread.hasMany(models.Post, { foreignKey: 'threadId' });
      }
    }
  });
  return Thread;
};
