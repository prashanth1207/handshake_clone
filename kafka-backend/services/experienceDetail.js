let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let ExperienceDetail = mongoose.model('ExperienceDetail');

async function handle_request(msg,callback){
  if(msg.params.path === 'createUpdateExperienceDetails'){
    ExperienceDetail.createOrUpdate(msg.body).then(experienceDetail =>{
      callback(null,experienceDetail);
    }).catch(e =>{
      callback(null,{error: e.message})
    })
  }
  
  if(msg.params.path === 'deleteExperienceDetails'){
    let experienceDetail = await ExperienceDetail.findOne({_id: msg.params.id});
    if(experienceDetail){
      experienceDetail.delete(experienceDetail)
      .then(async deletedResp => {
        let studentProfile = await StudentProfile.findById(experienceDetail.studentProfile);
        studentProfile.experienceDetails.pull(experienceDetail._id);
        await studentProfile.save();
        return deletedResp;
      })
      .then(_ =>{
        callback(null,true);
      }).catch(error =>{
        callback(null,{error: error.message});
      })
    }else{
      callback(null,{error: 'RecordNotFound'});
    }
  }
}

exports.handle_request = handle_request;