'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobApplications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobPostingId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      studentProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      resumePath: {
        type: Sequelize.STRING
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["jobPostingId","studentProfileId"]
        }
      }
    }
  );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('JobApplications');
  }
};