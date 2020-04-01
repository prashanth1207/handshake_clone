let mongoose = require('mongoose')
let JobApplication = mongoose.model('JobApplication');
let StudentProfile = mongoose.model('StudentProfile');
let JobPosting = mongoose.model('JobPosting');
const formidable = require('formidable')
let fs = require('fs');
let searchableQuery = require('./../utility/search').searchableQuery;


module.exports.getApplicationStatus = async (req, res) => {
  let {jobPostingId,studentProfileId} = req.body;
  JobApplication.findOne({jobPosting: jobPostingId, studentProfile: studentProfileId})
  .then(jobApplication =>{
    res.json({
      status: jobApplication ? jobApplication.status : 'Not Applied'
    })
  });
  
};

module.exports.setApplicationStatus = async (req, res) => {
  JobApplication.findById(req.param('id'))
    .then(async jobApplication => {
      if(jobApplication){
        jobApplication.status = req.body.status;
        jobApplication.save().then(_ =>{
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
      jobPosting: fields.jobPostingId,
      studentProfile: fields.studentProfileId,
      resumePath: `${fields.jobPostingId}_${fields.studentProfileId}_resume.pdf`
    }
    let jobApplication = await JobApplication.findOne({
      jobPosting: fields.jobPostingId, 
      studentProfile: fields.studentProfileId
    });
    if(jobApplication){
      return res.json({
        success: false,
        error: 'Application already submitted'
      })
    } 
    let resume = files.resume;
    let newJobApplication = new JobApplication(createData);
    newJobApplication.save()
    .then(async jobApplication => {
      let studentProfile = await StudentProfile.findById(fields.studentProfileId);
      let jobPosting = await JobPosting.findById(fields.jobPostingId);
      studentProfile.jobApplications.push(jobApplication._id);
      jobPosting.jobApplications.push(jobApplication._id);
      await studentProfile.save();
      await jobPosting.save();
      return jobApplication;
    })
    .then(_ =>{
      res.json({success: true});  
    })
    .catch(error => {
      res.json({
        success: false,
        error: error.message
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
  let {jobPostingId} = req.query;
  JobApplication.find({jobPosting: jobPostingId}).populate('studentProfile')
    .then(jobPostings => {
      res.json({data: jobPostings})
    })
    .catch(e => {
      res.json({error: e})
    })
}

module.exports.get_job_applications_for_a_student = (req, res) =>{
  let {studentProfileId} = req.params;
  let queryParams = searchableQuery(req.query);
  JobApplication.find({
    ...queryParams,
    studentProfile: studentProfileId
  })
  .populate('jobPosting')
  .then(jobPostings => {
    res.json({data: jobPostings})
  })
  .catch(e => {
    res.json({error: e})
  })
}