let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let EducationDetail = mongoose.model('EducationDetail');
let ExperienceDetail = mongoose.model('ExperienceDetail');
let searchableQuery =  require('./../utility/search').searchableQuery;
const formidable = require('formidable')
let fs = require('fs');

module.exports.get_all_students_profile = (req,res) =>{
  let query_params = req.query;
  let educationDetails_query = query_params.educationDetails || null;
  delete query_params.educationDetails
  let studentProfileQuery = searchableQuery(query_params);
  let educationDetailsQuery = searchableQuery(JSON.parse(educationDetails_query));
  StudentProfile.find(studentProfileQuery)
  .populate('educationDetails')
  .populate('experienceDetails')
  .then(studentProfiles =>{
    if(Object.keys(educationDetailsQuery).length > 0) {
      studentProfiles = studentProfiles.filter(profile =>{
        let educationDetail = profile.educationDetails[0];
        if(!educationDetail){
          return false;
        }
        let match = false;
        for(let [col_name,col_val] of Object.entries(educationDetailsQuery)){
          match = educationDetail[col_name].match(col_val.$regex);
        }
        return match;
      });
    }
    return res.json({data: studentProfiles});
  }).catch(e => {
    return res.json({error: e})
  })
}

module.exports.get_student_profile = async (req,res) => {

  let id = req.params.id;
  let studentProfile = await StudentProfile.findById(id)
    .populate('educationDetails').populate('experienceDetails');
  if(studentProfile){
    res.json(studentProfile)
  }else{
    res.status(404)
      .json({error: 'Record not found'});
  }
};

module.exports.update_student_profile = async(req,res) => {
  let id = req.params.id;
  let studentProfile = await StudentProfile.findById(id);
  if(studentProfile){
    try{
      let educationDetailsData = req.body.educationDetails;
      if(educationDetailsData){
        educationDetailsData.studentProfile = id;
        await EducationDetail.createOrUpdate(educationDetailsData,{where: {studentProfile: id}});
      }
      let experienceDetailsData = req.body.experienceDetails;
      if(experienceDetailsData){
        experienceDetailsData.studentProfile = id;
        await ExperienceDetail.createOrUpdate(experienceDetailsData,{where: {studentProfile: id}});
      }
      let studentProfileData = req.body.studentProfile;
      if(studentProfileData){
        await studentProfile.update(studentProfileData);
      }
      return res.json({success: true})
    }catch(error){
      res.json({
        success: false,
        error: error.message
      })
    }
  }else{
    res.status(404)
      .json({error: 'Record not found'});
  }
};

module.exports.upload_profile_pic = (req, res) =>{
  StudentProfile.findById(req.params.id).then(studentProfile =>{
    if(!studentProfile){
      return res.json({
        success: false,
        error: 'no record found'
      })
    }
    new formidable.IncomingForm().parse(req,async (err,_fields,files) =>{
      if(err){
        res.json({
          success: false,
          error: err
        })
      }
      let profilePic = files.profilePic;
      if(profilePic){
        fs.renameSync(profilePic.path,__basedir+`/public/images/profile_pics/${studentProfile.user._id}.png`)
        return res.json({
          success: true
        })
      }else{
        res.json({
          success: false,
          error: "No picture uploaded"
        })
      }
    }).catch(e =>{
      res.json({
        success: false,
        error: error
      })
    });
  })

}