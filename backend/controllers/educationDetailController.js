let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let EducationDetail = mongoose.model('EducationDetail');

module.exports.createOrUpdateEducationDetail = (req,resp) =>{
  EducationDetail.createOrUpdate(req.body).then(educationDetail =>{
    return resp.json({success: true,data: educationDetail})
  }).catch(e =>{
    return resp.json({success: false, error: e.message})
  })
}

module.exports.deleteEducationDetail = async (req, resp) => {
  let educationDetail = await EducationDetail.findOne({_id: req.params.id});
  if(educationDetail){
    educationDetail.delete(educationDetail)
    .then(async deletedResp => {
      let studentProfile = await StudentProfile.findById(educationDetail.studentProfile);
      studentProfile.educationDetails.pull(educationDetail._id);
      await studentProfile.save();
      return deletedResp;
    })
    .then(_ =>{
      resp.json({success: true})
    }).catch(error =>{
      resp.json({success: false, error: error.message});
    })
  }else{
    return resp.json({success: false, error: 'RecordNotFound'});
  }
}