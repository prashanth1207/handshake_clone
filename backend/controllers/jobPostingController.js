let mongoose = require('mongoose');
let JobPosting = mongoose.model('JobPosting');
let CompanyProfile = mongoose.model('CompanyProfile');
let searchableQuery =  require('./../utility/search').searchableQuery;

module.exports.show_all_job_postings = async (req,resp) => {
  JobPosting.find(req.query)
    .populate('companyProfile')
    .then(jobPostings => {
      return resp.json(jobPostings)
    })
    .catch(error => {
      return resp.json({error: error.message})
    });
}

module.exports.get_job_posting = async (req,resp) => {
  let id = req.params.id;
    let jobPosting = await JobPosting.findById(id).populate('companyProfile');
  if(jobPosting){
    resp.json(jobPosting);
  }else{
    resp.status(404)
      .json({error: 'Record not found'});
  }
}

module.exports.create_job_posting = async (req,resp) => {
  let companyProfileId = req.params.company_profile_id;
  let jobPostingData = req.body;
  jobPostingData.companyProfile = companyProfileId;
  let jobPosting = new JobPosting(jobPostingData);
  jobPosting.save()
  .then(async (job_posting) =>{
    let companyProfile = await CompanyProfile.findById(companyProfileId);
    companyProfile.jobPostings.push(job_posting._id);
    await companyProfile.save();
    return job_posting;
  })
  .then(_ => {
    resp.json({success: true});
  })
  .catch(e =>{
    resp.json({
      success: false,
      error: e.message
    });
  })
}