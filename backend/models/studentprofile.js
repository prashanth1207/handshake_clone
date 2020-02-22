'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define('StudentProfile', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: 'First name cannot be empty'
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: 'Last name cannot be empty'
      },
    },
    collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: 'College name cannot be empty'
      }
    }
  }, {});
  StudentProfile.associate = function(models) {
    StudentProfile.belongsTo(models.User,{
      as: 'user',
    });
  };
  return StudentProfile;
};