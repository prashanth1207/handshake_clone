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
  //class methods
  ExperienceDetail.createOrUpdate = async (data,condtion) =>{
    let experienceDetail = await ExperienceDetail.findBy({column: condtion.where});
    if(experienceDetail){
      return experienceDetail.update(data);
    }
    return ExperienceDetail.create(data);
  }

  ExperienceDetail.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await ExperienceDetail.findAll(final_query)
    return res[0]
  }

  ExperienceDetail.associate = function(models) {
    ExperienceDetail.belongsTo(models.StudentProfile,{
      as: 'studentProfile',
    });
  };
  return ExperienceDetail;
};