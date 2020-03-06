let models = require('./../models')
let JobPosting = models.JobPosting
let CompanyProfile = models.CompanyProfile

module.exports.show_all_job_postings = async (req,resp) => {
  let filter_params = {where: req.query || {}};
  let jobPostings = await JobPosting.findAll(Object.assign({},filter_params,{include: [{model: CompanyProfile, as: 'companyProfile'}]}));
  resp.json(JSON.parse(JSON.stringify(jobPostings)));
}

module.exports.get_job_posting = async (req,resp) => {
  let id = req.params.id;
    let jobPosting = await JobPosting.findBy({column: {id: id},include: [{model: CompanyProfile, as: 'companyProfile'}]});
  if(jobPosting){
    resp.json(JSON.parse(JSON.stringify(jobPosting)))
  }else{
    resp.status(404)
      .json({error: 'Record not found'});
  }
}

module.exports.create_job_posting = async (req,resp) => {
  let companyProfileId = req.params.company_profile_id;
  let jobPostingData = req.body;
  JobPosting.create(Object.assign({},jobPostingData,{companyProfileId: companyProfileId}))
  .then(rp => {
    resp.json({success: true});
  })
  .catch(e =>{
    resp.json({
      success: false,
      error: e.errors[0].message
    });
  })
}