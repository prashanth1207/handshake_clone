'use strict';

var mongoose = require('mongoose');

const ExperienceDetailSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  title: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  workDescription: {
    type: String,
  },
  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile'
  }
},
{
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

ExperienceDetailSchema.virtual('readableStartDate').get(function(){
  if (this.startDate){
    return new Date(this.startDate).toLocaleString('en-US', { 
      month: 'long',
      year: 'numeric' 
    })
  }
  else{
    return null
  }
});

ExperienceDetailSchema.virtual('readableEndDate').get(function(){
  if (this.endDate){
    return new Date(this.endDate).toLocaleString('en-US', { 
      month: 'long',
      year: 'numeric' 
    })
  }
  else{
    return null
  }
});

ExperienceDetailSchema.statics.createOrUpdate = async function(data){
  let experienceDetail = await this.findOne({_id: data.id});
  delete data.id
  if(experienceDetail){
    return await this.findOneAndUpdate(
      { _id: experienceDetail._id },
      { $set: data }, 
      {"new": true})
    .exec()
    .then( experienceDetail => experienceDetail);
  }
  let newExperienceDetail = new this(data)
  let savednewExperienceDetail = newExperienceDetail.save(data).then((experienceDetail) => {
    return experienceDetail;
  });
  let StudentProfile = mongoose.model('StudentProfile');
  let studentProfile = await StudentProfile.findById(data.studentProfile)
  studentProfile.experienceDetails.push(savednewExperienceDetail._id);
  await studentProfile.save();
  return savednewExperienceDetail
}

module.exports = mongoose.model.ExperienceDetail || mongoose.model('ExperienceDetail', ExperienceDetailSchema);


// ExperienceDetail.createOrUpdate = async (data,condtion) =>{
//   let experienceDetail = await ExperienceDetail.findBy({column: condtion.where});
//   if(experienceDetail){
//     return experienceDetail.update(data);
//   }
//   return ExperienceDetail.create(data);
// }

// ExperienceDetail.findBy = async (queryObject) => {
//   let where_query = {where: queryObject.column}
//   delete queryObject.column
//   let final_query = Object.assign({},where_query, queryObject)
//   let res = await ExperienceDetail.findAll(final_query)
//   return res[0]
// }

// ExperienceDetail.associate = function(models) {
//   ExperienceDetail.belongsTo(models.StudentProfile,{
//     as: 'studentProfile',
//   });
// };
