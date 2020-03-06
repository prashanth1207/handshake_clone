'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define('JobApplication', {
    jobPostingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resumePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Pending','Reviewed','Declined']],
          msg: 'Invalid status',
        }
      },
      defaultValue: 'Pending'
    },
    
  }, {
    indexes: [
        {
            unique: true,
            fields: ['jobPostingId', 'studentProfileId']
        }
    ]
});
  
  // class methods
  JobApplication.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await JobApplication.findAll(final_query)
    return res[0]
  }

  JobApplication.associate = function(models) {
    JobApplication.belongsTo(models.StudentProfile, {
      as:'studentProfile'
    });
    JobApplication.belongsTo(models.JobPosting, {
      as:'jobPosting'
    });
  };
  return JobApplication;
};