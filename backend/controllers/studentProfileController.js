let models = require('./../models')
let StudentProfile = models.StudentProfile;
let EducationDetail = models.EducationDetail;
let ExperienceDetail = models.ExperienceDetail;
let sequelize = models.sequelize;
let searchableQuery =  require('./../utility/search').searchableQuery;
const formidable = require('formidable')
let fs = require('fs');

module.exports.get_all_students_profile = (req,res) =>{
  let query_params = req.query;
  let educationDetails_query = query_params.educationDetails || null;
  delete query_params.educationDetails
  let studentProfileQuery = searchableQuery(query_params);
  let educationDetailsQuery = searchableQuery(JSON.parse(educationDetails_query));
  let includeEducationDetails = {
    model: EducationDetail,
    as : 'educationDetails',
  }
  if(Object.keys(educationDetailsQuery).length > 0) {
    includeEducationDetails['where'] = educationDetailsQuery
  }
  let includeExperienceDetail = {
    model: ExperienceDetail,
    as: 'experienceDetails'
  }
  StudentProfile.findAll({
    where: studentProfileQuery,
    include: [includeEducationDetails, includeExperienceDetail]
  }).then(studentProfiles =>{
    return res.json({data: studentProfiles});
  }).catch(e => {
    return res.json({error: e})
  })
}

module.exports.get_student_profile = async (req,res) => {

  let id = req.params.id;
    let studentProfile = await StudentProfile.findBy({
      column: {id: id},
      include: [{
        model: EducationDetail,
        as : 'educationDetails'
      },
      {
        model: ExperienceDetail,
        as: 'experienceDetails'
      }
    ]
  })
  if(studentProfile){
    res.json(JSON.parse(JSON.stringify(studentProfile.dataValues)))
  }else{
    res.status(404)
      .json({error: 'Record not found'});
  }
};

module.exports.update_student_profile = async(req,res) => {
  let id = req.params.id;
  let studentProfile = await StudentProfile.findBy({column: {id: id}});
  if(studentProfile){
    sequelize.transaction(async() => {
      studentProfile.update(req.body.studentProfile)
        .then(async result => {
          let educationDetails = req.body.educationDetails
          if(!educationDetails){
            return true
          }
          educationDetails.studentProfileId = id;
          await EducationDetail.createOrUpdate(req.body.educationDetails,{where: {studentProfileId: id}});
          return true
        })
        .then(async result =>{
          let experienceDetails = req.body.experienceDetails
          if(!experienceDetails){
            return true
          }
          experienceDetails.studentProfileId = id;
          await ExperienceDetail.createOrUpdate(req.body.experienceDetails,{where: {studentProfileId: id}});
          return true
        })
        .then(result =>{
          return res.json({success: true})
        })
        .catch(e => {
          return res.json({
            success: false,
            error: e.message
          })
        })
    })
  }else{
    res.status(404)
      .json({error: 'Record not found'});
  }
};

module.exports.upload_profile_pic = (req, res) =>{
  StudentProfile.findBy({column: {id: req.params.id}}).then(studentProfile =>{
    if(!studentProfile){
      return res.json({
        success: false,
        error: 'no record found'
      })
    }
    new formidable.IncomingForm().parse(req,async (err,fields,files) =>{
      if(err){
        res.json({
          success: false,
          error: err
        })
      }
      let profilePic = files.profilePic;
      fs.renameSync(profilePic.path,__basedir+`/public/images/profile_pics/${studentProfile.userId}.png`)
      return res.json({
        success: true
      })
    }).catch(e =>{
      res.json({
        success: false,
        error: error
      })
    });
  })

}