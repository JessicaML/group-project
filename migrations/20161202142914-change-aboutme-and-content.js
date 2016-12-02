'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn(
      'Sponsors',
      'aboutme',
      'about',
      {
        type: Sequelize.TEXT
      }
    ),

    queryInterface.renameColumn(
      'Readers',
      'aboutme',
      'about',
      {
        type: Sequelize.TEXT
      }
    ),

    queryInterface.renameColumn(
      'Books',
      'content',
      'description',
      {
        type: Sequelize.TEXT
      }
    );

        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Sponsors', 'about', 'aboutme');
    queryInterface.renameColumn('Readers', 'about', 'aboutme');
    queryInterface.renameColumn('Books', 'description', 'content');


    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
