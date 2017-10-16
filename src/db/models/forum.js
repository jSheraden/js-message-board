'use strict';
module.exports = (sequelize, DataTypes) => {
  var Forum = sequelize.define('Forum', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Forum;
};