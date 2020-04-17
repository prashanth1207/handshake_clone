let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let EducationDetail = mongoose.model('EducationDetail');

async function handle_request(msg, callback) {
  if(msg.params.path === 'createUpdateEducationDetails'){
    educationDetail = await EducationDetail.createOrUpdate(msg.body).catch(e =>{
      callback(e,null);
    })
    console.log(educationDetail);
    callback(null,educationDetail)
  }
  
  if(msg.params.path === 'deleteEducationDetails'){
    let educationDetail = await EducationDetail.findOne({_id: msg.params.id});
    if(educationDetail){
      educationDetail.delete(educationDetail)
      .then(async deletedResp => {
        let studentProfile = await StudentProfile.findById(educationDetail.studentProfile);
        studentProfile.educationDetails.pull(educationDetail._id);
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