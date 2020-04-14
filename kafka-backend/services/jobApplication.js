let mongoose = require('mongoose')
let JobApplication = mongoose.model('JobApplication');
let StudentProfile = mongoose.model('StudentProfile');
let JobPosting = mongoose.model('JobPosting');
const formidable = require('formidable')
let fs = require('fs');
let searchableQuery = require('./../utility/search').searchableQuery;


async function handle_request(msg, callback) {
  if(msg.params.path === 'getApplicationStatus'){
    let {jobPostingId,studentProfileId} = msg.body;
    JobApplication.findOne({jobPosting: jobPostingId, studentProfile: studentProfileId})
    .then(jobApplication =>{
      callback(null,jobApplication ? jobApplication.status : 'Not Applied')
    });
  };
  
  if(msg.params.path === 'setApplicationStatus'){
    JobApplication.findById(msg.params.id)
      .then(async jobApplication => {
        if(jobApplication){
          jobApplication.status = msg.body.status;
          jobApplication.save().then(jobApplication =>{
           callback(null,jobApplication);
          })
        }else{
          res.json({
            success: false,
            error: 'Record not found'
          });
        }
      })
      .catch(e => {
        callback(null,{error: e.errors[0].message})
      });
  }
  
  if(msg.params.path === 'create_job_application'){
    var createData = {
      jobPosting: msg.fields.jobPostingId,
      studentProfile: msg.fields.studentProfileId,
      resumePath: `${msg.fields.jobPostingId}_${msg.fields.studentProfileId}_resume.pdf`
    }
    var jobApplication = await JobApplication.findOne({
      jobPosting: msg.fields.jobPostingId, 
      studentProfile: msg.fields.studentProfileId
    });
    if(jobApplication){
      callback(null,{error: 'Application already submitted'});
    } 
    var newJobApplication = new JobApplication(createData);
    newJobApplication.save()
    .then(async jobApplication => {
      let studentProfile = await StudentProfile.findById(msg.fields.studentProfileId);
      let jobPosting = await JobPosting.findById(msg.fields.jobPostingId);
      studentProfile.jobApplications.push(jobApplication._id);
      jobPosting.jobApplications.push(jobApplication._id);
      await studentProfile.save();
      await jobPosting.save();
      return jobApplication;
    })
    .then(_ =>{
      callback(null,true);  
    })
    .catch(error => {
      callback(null, {error: error.message});
    })
  }
  
  if(msg.params.path === 'get_job_applications_for_a_job_posting'){
    let {jobPostingId} = msg.query;
    JobApplication.find({jobPosting: jobPostingId}).populate('studentProfile')
      .then(jobPostings => {
        callback(null, jobPostings)
      })
      .catch(e => {
        callback(null,{error: e})
      })
  }
  
  if(msg.params.path === 'get_job_applications_for_a_student'){
    let {studentProfileId} = msg.params;
    let queryParams = msg.query;
    let page = parseInt(queryParams.page || 1) - 1;
    let perPage = parseInt(queryParams.perPage || 10);
    delete queryParams.page;
    delete queryParams.perPage;
    queryParams = searchableQuery(queryParams);
    let totalRecords = await JobApplication.find({
      ...queryParams,
      studentProfile: studentProfileId
    }).count();
    JobApplication.find({
      ...queryParams,
      studentProfile: studentProfileId
    })
    .populate('jobPosting')
    .skip(page > -1 ? page*perPage : 0)
    .limit(perPage)
    .then(jobPostings => {
      callback(null,{data: jobPostings,totalRecords: totalRecords});
    })
    .catch(e => {
      callback(null,{error: e})
    })
  }
}

exports.handle_request = handle_request;
