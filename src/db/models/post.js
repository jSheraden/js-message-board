'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    body: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return Post;
};
