'use strict';
module.exports = (sequelize, DataTypes) => {
  var Forum = sequelize.define('Forum', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Forum.hasMany(models.Thread, { foreignKey: 'forumId' });
      }
    }
  });
  return Forum;
};
