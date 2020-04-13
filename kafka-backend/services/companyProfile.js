let mongoose = require('mongoose');
let CompanyProfile = mongoose.model('CompanyProfile');

async function handle_request(msg, callback) {
  console.log(msg);
  if(msg.params.path === 'get_company_profile'){
    try{
      let id = msg.params.id;
      let companyProfile = await CompanyProfile.findById(id);
      if(companyProfile){
        callback(null,companyProfile);
      }else{
        callback(null,{error: 'Record not found'});
      }
    }catch(err){
      callback(null,{error: err});
    }
  }
  
  if(msg.params.path === 'update_company_profile'){
    let id = msg.params.id;
    CompanyProfile.findById(id)
    .then(async companyProfile =>{
      if(!companyProfile){
        return callback('Record not found',null);
      }
      companyProfile.name = msg.fields.name;
      companyProfile.location = msg.fields.location;
      companyProfile.description = msg.fields.description;
      companyProfile.contactInformation = msg.fields.contactInformation;
      await companyProfile.save().catch(err => {
        return callback(null,{error: err})
      })
      callback(null,companyProfile)
    })
  }
}

exports.handle_request = handle_request;