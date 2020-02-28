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
    },
    description:{
      type: DataTypes.TEXT
    },
    contactInformation:{
      type: DataTypes.TEXT
    }
  }, {});

  // class methods
  CompanyProfile.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await CompanyProfile.findAll(final_query)
    return res[0]
  }

  CompanyProfile.associate = function(models) {
    CompanyProfile.belongsTo(models.User, {
      as: 'user',
    });
    CompanyProfile.hasMany(models.JobPosting, {
      as: 'jobPosting',
    });
  };
  return CompanyProfile;
};