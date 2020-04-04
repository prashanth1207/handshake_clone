let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let ExperienceDetail = mongoose.model('ExperienceDetail');

module.exports.createOrUpdateExperienceDetail = (req,resp) =>{
  ExperienceDetail.createOrUpdate(req.body).then(experienceDetail =>{
    return resp.json({success: true,data: experienceDetail})
  }).catch(e =>{
    return resp.json({success: false, error: e.message})
  })
}

module.exports.deleteExperienceDetail = async (req, resp) => {
  let experienceDetail = await ExperienceDetail.findOne({_id: req.params.id});
  if(experienceDetail){
    experienceDetail.delete(experienceDetail)
    .then(async deletedResp => {
      let studentProfile = await StudentProfile.findById(experienceDetail.studentProfile);
      studentProfile.experienceDetails.pull(experienceDetail._id);
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