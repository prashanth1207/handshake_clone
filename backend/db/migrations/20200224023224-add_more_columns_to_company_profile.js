module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('CompanyProfiles', 'description', {
                  type: Sequelize.TEXT,
                  allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('CompanyProfiles', 'contactInformation', {
                  type: Sequelize.TEXT,
                  allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('CompanyProfiles', 'profilePicPath', {
                type: Sequelize.STRING,
                allowNull: true,
            }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('CompanyProfiles', 'description', { transaction: t }),
              queryInterface.removeColumn('CompanyProfiles', 'contactInformation', { transaction: t }),
              queryInterface.removeColumn('CompanyProfiles', 'profilePicPath', { transaction: t })
          ])
      })
  }
};