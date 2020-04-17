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
  let educationDetail = await this.findOne({_id: data.id});
  delete data.id;
  if(educationDetail){
    return this.findOneAndUpdate(
      { _id: educationDetail._id },
      { $set: data },
      { 'new': true }
    )
    .exec()
    .then(educationDetail => educationDetail)
  }
  let newEducationDetail = new this(data);
  let savednewEducationDetail = newEducationDetail.save(data).then((educationDetail) => {
    return educationDetail;
  });
  let studentProfile = await StudentProfile.findById(data.studentProfile)
  studentProfile.educationDetails.push(savednewEducationDetail._id);
  await studentProfile.save();
  console.log(savednewEducationDetail);
  return savednewEducationDetail
}
module.exports = mongoose.model.EducationDetail || mongoose.model('EducationDetail', EducationDetailSchema);


  //class methods