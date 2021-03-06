'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('list_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.STRING
      },
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // details belongs to list
          model: 'lists',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('list_details');
  }
};