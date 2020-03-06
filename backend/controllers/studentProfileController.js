let models = require('./../models')
let StudentProfile = models.StudentProfile
let EducationDetail = models.EducationDetail
let ExperienceDetail = models.ExperienceDetail
let sequelize = models.sequelize

module.exports.get_all_students_profile = (req,res) =>{
  let query_params = req.query;
  StudentProfile.findAll({
    where: query_params,
    include: [{
      model: EducationDetail,
      as : 'educationDetails'
    },
    {
      model: ExperienceDetail,
      as: 'experienceDetails'
    }]
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
            error: (e.errors || [{}])[0].message
          })
        })
    })
  }else{
    res.status(404)
      .json({error: 'Record not found'});
  }
};