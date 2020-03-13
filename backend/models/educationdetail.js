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

  //class methods
  EducationDetail.createOrUpdate = async (data,condtion) =>{
    let educationDetail = await EducationDetail.findBy({column: condtion.where});
    if(educationDetail){
      return educationDetail.update(data);
    }
    return EducationDetail.create(data);
  }

  EducationDetail.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await EducationDetail.findAll(final_query)
    return res[0]
  }

  EducationDetail.associate = function(models) {
    EducationDetail.belongsTo(models.StudentProfile,{
      as: 'studentProfile',
    });
  };
  return EducationDetail;
};