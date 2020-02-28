'use strict';
module.exports = (sequelize, DataTypes) => {
  const EducationDetail = sequelize.define('EducationDetail', {
    collegeName: DataTypes.STRING,
    collegeLocation: DataTypes.STRING,
    degree: DataTypes.STRING,
    major: DataTypes.STRING,
    yearOfPassing: DataTypes.INTEGER,
    currentCgpa: DataTypes.FLOAT,
    highestDegree: {
      allowNull:false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  EducationDetail.associate = function(models) {
    EducationDetail.belongsTo(models.StudentProfile,{
      as: 'studentProfile',
    });
  };
  return EducationDetail;
};