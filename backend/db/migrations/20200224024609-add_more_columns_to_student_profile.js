module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('StudentProfiles', 'dob', {
                  type: Sequelize.DATEONLY,
                  allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'city', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'state', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'country', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'careerObjective', {
                type: Sequelize.TEXT,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'phoneNumber', {
                  type: Sequelize.STRING,
                  allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'skillSet', {
                type: Sequelize.TEXT,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('StudentProfiles', 'profilePicPath', {
                type: Sequelize.STRING,
                allowNull: true,
            }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('StudentProfiles', 'dob', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'city', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'state', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'country', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'careerObjective', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'phoneNumber', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'skillSet', { transaction: t }),
          queryInterface.removeColumn('StudentProfiles', 'profilePicPath', { transaction: t })
      ])
  })
  }
};