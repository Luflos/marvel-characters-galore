'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('creators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      comics: {
        type: Sequelize.INTEGER
      },
      series: {
        type: Sequelize.INTEGER
      },
      stories: {
        type: Sequelize.INTEGER
      },
      events: {
        type: Sequelize.INTEGER
      },
      thumbnail: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('creators');
  }
};