'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      eventName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      time: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      eligibility: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};