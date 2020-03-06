let models = require('./../models')
let JobApplication = models.JobApplication;
let StudentProfile = models.StudentProfile;
const formidable = require('formidable')
let fs = require('fs');


module.exports.getApplicationStatus = async (req, res) => {
  let {jobPostingId,studentProfileId} = req.body;
  JobApplication.findBy({column: {jobPostingId: jobPostingId, studentProfileId: studentProfileId}})
  .then(jobApplications =>{
    res.json({
      status: jobApplications ? jobApplications.status : 'Not Applied'
    })
  });
  
}

module.exports.setApplicationStatus = async (req, res) => {
  JobApplication.findBy({column: {id: req.param('id')}})
    .then(async jobApplication => {
      if(jobApplication){
        let status = await jobApplication.update({status: req.body.status}).then(_ =>{
          return res.json({
            success: true
          });
        })
      }else{
        res.json({
          success: false,
          error: 'Record not found'
        });
      }
    })
    .catch(e => {
      res.json({
        success: false,
        error: e.errors[0].message
      })
    });
}

module.exports.create_job_application = async (req, res) =>{ 
  new formidable.IncomingForm().parse(req,async (err,fields,files) =>{
    if(err){
      res.json({
        success: false,
        error: err
      })
    }
    let createData = {
      jobPostingId: fields.jobPostingId,
      studentProfileId: fields.studentProfileId,
      resumePath: `${fields.jobPostingId}_${fields.studentProfileId}_resume.pdf`
    }
    let jobApplication = await JobApplication.findBy({
      column: {
        jobPostingId: createData.jobPostingId, 
        studentProfileId: createData.studentProfileId
      }
    });
    if(jobApplication){
      return res.json({
        success: false,
        error: 'Application already submitted'
      })
    } 
    let resume = files.resume;
    JobApplication.create(createData)
    .then(_ =>{
      res.json({success: true});  
    })
    .catch(error => {
      res.json({
        success: false,
        error: error.errors[0].message
      })
    })
    fs.renameSync(resume.path,__basedir+'/public/resume/'+createData.resumePath)
  }).catch(e =>{
    res.json({
      success: false,
      error: error
    })
  });
}

module.exports.get_job_applications_for_a_job_posting = (req, res) =>{
  let jobPostingId = req.param('jobPostingId');
  JobApplication.findAll({where: {jobPostingId: jobPostingId},include: [{model: StudentProfile,as: 'studentProfile'}]})
    .then(jobPostings => {
      res.json({data: jobPostings})
    })
    .catch(e => {
      res.json({error: e})
    })
}