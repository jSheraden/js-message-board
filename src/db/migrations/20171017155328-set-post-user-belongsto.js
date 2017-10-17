'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'userId', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {

  }
};
