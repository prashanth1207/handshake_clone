'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define('JobPosting', {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job title cannot be empty',
        },
        notEmpty: {
          msg: 'Job title cannot be empty'
        }
      }
    },
    postingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Posting date cannot be empty',
        },
        notEmpty: {
          msg: 'Posting date cannot be empty'
        }
      }
    },
    applicationDeadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Application deadline cannot be empty',
        },
        notEmpty: {
          msg: 'Application deadline cannot be empty'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'location cannot be empty',
        },
        notEmpty: {
          msg: 'location cannot be empty'
        }
      }
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Salary cannot be empty',
        },
        notEmpty: {
          msg: 'Salary cannot be empty'
        }
      }
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job description cannot be empty',
        },
        notEmpty: {
          msg: 'Job description cannot be empty'
        }
      }
    },
    jobCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job category cannot be empty',
        },
        notEmpty: {
          msg: 'Job category cannot be empty'
        }
      }
    }
  }, {});
  // class methods
  JobPosting.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await JobPosting.findAll(final_query)
    return res[0]
  }

  JobPosting.associate = function(models) {
    JobPosting.belongsTo(models.CompanyProfile, {
      as: 'companyProfile',
    });
  };
  return JobPosting;
};