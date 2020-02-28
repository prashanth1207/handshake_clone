'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExperienceDetail = sequelize.define('ExperienceDetail', {
    companyName: DataTypes.STRING,
    title: DataTypes.STRING,
    companyLocation: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    readableStartDate: {
      type: DataTypes.VIRTUAL,
      get: function(){
        if (this.startDate){
          return new Date(this.startDate).toLocaleString('en-US', { 
            month: 'long',
            year: 'numeric' 
          })
        }
        else{
          return null
        }
      }
    },
    endDate: DataTypes.DATEONLY,
    readableEndDate: {
      type: DataTypes.VIRTUAL,
      get: function(){
        if (this.endDate){
          return new Date(this.endDate).toLocaleString('en-US', { 
            month: 'long',
            year: 'numeric' 
          })
        }
        else{
          return null
        }
      }
    },
    workDescription: DataTypes.TEXT
  }, {});
  ExperienceDetail.associate = function(models) {
    ExperienceDetail.belongsTo(models.StudentProfile,{
      as: 'studentProfile',
    });
  };
  return ExperienceDetail;
};