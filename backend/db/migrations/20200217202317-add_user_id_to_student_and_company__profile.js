module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('StudentProfiles', 'userId', {
                  type: Sequelize.INTEGER,
                  allowNull: false,
              }, { transaction: t }),
              queryInterface.addColumn('CompanyProfiles', 'userId', {
                  type: Sequelize.INTEGER,
                  allowNull: false,
              }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('StudentProfile', 'userId', { transaction: t }),
              queryInterface.removeColumn('CompanyProfile', 'userId', { transaction: t })
          ])
      })
  }
};