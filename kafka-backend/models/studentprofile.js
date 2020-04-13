'use strict';

var mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'First name cannot be empty',
    //   },
    //   notEmpty: {
    //     msg: 'First name cannot be empty'
    //   }
    // }
  },
  lastName: {
    type: String,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'Last name cannot be empty',
    //   },
    //   notEmpty: {
    //     msg: 'Last name cannot be empty'
    //   }
    // },
  },
  currentCollegeName: {
    type: String,
    required: true,
    // validate: {
    //   notNull: 'College name cannot be empty'
    // }
  },
  city:{
    type: String
  },
  state:{
    type: String
  },
  country:{
    type: String
  },
  skillSet:{
    type: String
  },
  careerObjective:{
    type: String
  },
  phoneNumber:{
    type: String
  },
  dob:{
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  educationDetails:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EducationDetail'
    }
  ],
  experienceDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExperienceDetail'
    }
  ],
  jobApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobApplication'
    }
  ],
  messageWindows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MessageWindow'
    }
  ]
},
{
  timestamps: true
});

module.exports = mongoose.model.StudentProfile || mongoose.model('StudentProfile', StudentProfileSchema);

// module.exports = (sequelize, DataTypes) => {
//   const StudentProfile = sequelize.define('StudentProfile', {
    
//   }, {});
//   // class methods
//   StudentProfile.findBy = async (queryObject) => {
//     let where_query = {where: queryObject.column}
//     delete queryObject.column
//     let final_query = Object.assign({},where_query, queryObject)
//     let res = await StudentProfile.findAll(final_query)
//     return res[0]
//   }

//   StudentProfile.associate = function(models) {
//     StudentProfile.belongsTo(models.User,{
//       as: 'user',
//     });
//     StudentProfile.hasMany(models.EducationDetail,{
//       as: 'educationDetails',
//     });
//     StudentProfile.hasMany(models.ExperienceDetail,{
//       as: 'experienceDetails',
//     });
//   };
//   return StudentProfile;
// };