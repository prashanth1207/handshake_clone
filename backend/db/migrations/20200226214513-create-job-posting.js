'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobPostings', {
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
      jobTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      applicationDeadline: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salary: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jobDescription: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      jobCategory: {
        allowNull: false,
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
    return queryInterface.dropTable('JobPostings');
  }
};