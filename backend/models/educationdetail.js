'use strict';

var mongoose = require('mongoose');

const EducationDetailSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
    },
    collegeLocation: {
      type: String,
    },
    degree: {
      type: String,
    },
    major: {
      type: String,
    },
    yearOfPassing: {
      type: Number,
      set: (v) => Math.round(v)
    },
    currentCgpa: {
      type: Number,
    },
    highestDegree: {
      required:true,
      type: Boolean
    },
    studentProfile: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'StudentProfile'
    }
  },
  {
    timestamps: true
  } 
  )
EducationDetailSchema.statics.createOrUpdate = async function(data,condition){
  let educationDetail = await this.findOne(condition.where);
  if(educationDetail){
    return this.updateOne({ _id: educationDetail._id },{ $set: data });
  }
  let newEducationDetail = new this(data)
  return newEducationDetail.save(data).then(async (educationDetail) => {
    let StudentProfile = mongoose.model('StudentProfile');
    let studentProfile = await StudentProfile.findById(condition.where.studentProfile)
    studentProfile.educationDetails.push(educationDetail._id);
    await studentProfile.save();
    return educationDetail;
  });
}
module.exports = mongoose.model.EducationDetail || mongoose.model('EducationDetail', EducationDetailSchema);


  //class methods