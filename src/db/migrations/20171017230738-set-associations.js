'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'userId', Sequelize.INTEGER)
      .then(() => queryInterface.addColumn('Posts', 'threadId', Sequelize.INTEGER))
      .then(() => queryInterface.addColumn('Threads', 'forumId', Sequelize.INTEGER))
      .then(() => queryInterface.addColumn('Forums', 'categoryId', Sequelize.INTEGER));
  },

  down: (queryInterface, Sequelize) => {

  }
};
