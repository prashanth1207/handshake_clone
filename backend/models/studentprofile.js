'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define('StudentProfile', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name cannot be empty',
        },
        notEmpty: {
          msg: 'First name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name cannot be empty',
        },
        notEmpty: {
          msg: 'Last name cannot be empty'
        }
      },
    },
    currentCollegeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: 'College name cannot be empty'
      }
    },
    city:{
      type: DataTypes.STRING
    },
    state:{
      type: DataTypes.STRING
    },
    country:{
      type: DataTypes.STRING
    },
    skillSet:{
      type: DataTypes.STRING
    },
    careerObjective:{
      type: DataTypes.TEXT
    },
    phoneNumber:{
      type: DataTypes.STRING
    },
    dob:{
      type: DataTypes.DATEONLY
    }
  }, {});
  // class methods
  StudentProfile.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await StudentProfile.findAll(final_query)
    return res[0]
  }

  StudentProfile.associate = function(models) {
    StudentProfile.belongsTo(models.User,{
      as: 'user',
    });
    StudentProfile.hasMany(models.EducationDetail,{
      as: 'educationDetails',
    });
    StudentProfile.hasMany(models.ExperienceDetail,{
      as: 'experienceDetails',
    });
  };
  return StudentProfile;
};