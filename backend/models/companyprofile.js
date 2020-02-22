'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyProfile = sequelize.define('CompanyProfile', {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: 'Name cannot be empty'
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: 'Location cannot be empty'
      }
    }
  }, {});
  CompanyProfile.associate = function(models) {
    CompanyProfile.belongsTo(models.User, {
      as: 'user',
    });
  };
  return CompanyProfile;
};