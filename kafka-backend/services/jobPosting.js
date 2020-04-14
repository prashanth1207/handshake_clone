let mongoose = require('mongoose');
let JobPosting = mongoose.model('JobPosting');
let CompanyProfile = mongoose.model('CompanyProfile');
let searchableQuery =  require('./../utility/search').searchableQuery;

async function handle_request(msg, callback) {
  console.log(msg);
  if(msg.params.path === 'show_all_job_postings'){
    let query_params = msg.query;
    let page = parseInt(query_params.page || 1) - 1;
    let perPage = parseInt(query_params.perPage || 10);
    delete query_params.page;
    delete query_params.perPage;
    let companyProfile = query_params.companyProfile;
    delete query_params.companyProfile;
    let sort = query_params.sort || {};
    delete query_params.sort;
    let finalQuery = searchableQuery(query_params);
    companyProfile && (finalQuery.companyProfile = companyProfile);
    let totalRecords = await JobPosting.find(finalQuery).count();
    JobPosting.find(finalQuery)
      .populate('companyProfile')
      .skip(page > -1 ? page*perPage : 0)
      .limit(perPage)
      .sort(sort)
      .then(jobPostings => {
        jobPostings.forEach(jp => console.log(jp.jobTitle));
        callback(null,{data:jobPostings, totalRecords: totalRecords});
      })
      .catch(error => {
        callback(null,{error: error.message})
      });
  }
  
  if(msg.params.path === 'get_job_posting'){
    let id = msg.params.id;
    let jobPosting = await JobPosting.findById(id).populate('companyProfile');
    if(jobPosting){
      callback(null,jobPosting);
    }else{
      callback(null,{error: 'Record not found'});
    }
  }
  
  if(msg.params.path === 'create_job_posting'){
    let companyProfileId = msg.params.company_profile_id;
    let jobPostingData = msg.body;
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
      callback(null,{success: true});
    })
    .catch(e =>{
      callback(null,{
        success: false,
        error: e.message
      });
    })
  }
}
exports.handle_request = handle_request;
