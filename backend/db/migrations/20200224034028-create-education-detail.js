'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EducationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      collegeName: {
        type: Sequelize.STRING
      },
      collegeLocation: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      yearOfPassing: {
        type: Sequelize.INTEGER
      },
      currentCgpa: {
        type: Sequelize.FLOAT
      },
      highestDegree: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('EducationDetails');
  }
};