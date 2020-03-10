let models = require('./../models')
let StudentProfile = models.StudentProfile;
let EducationDetail = models.EducationDetail;
let ExperienceDetail = models.ExperienceDetail;
let sequelize = models.sequelize;
let searchableQuery =  require('./../utility/search').searchableQuery;

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
      StudentProfile.update(req.body.studentProfile,{where: {id: id}})
        .then(async result => {
          let educationDetails = req.body.educationDetails
          await EducationDetail.update(req.body.educationDetails,{where: {id: educationDetails.id,studentProfileId: id}});
          return true
        })
        .then(async result =>{
          let experienceDetails = req.body.experienceDetails
          await ExperienceDetail.update(req.body.experienceDetails,{where: {id: experienceDetails.id,studentProfileId: id}});
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