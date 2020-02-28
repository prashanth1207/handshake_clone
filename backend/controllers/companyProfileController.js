let models = require('./../models')
let CompanyProfile = models.CompanyProfile

module.exports.get_company_profile = async (req,resp) => {
  let id = req.params.id;
    let companyProfile = await CompanyProfile.findBy({column: {id: id}})
  if(companyProfile){
    resp.json(JSON.parse(JSON.stringify(companyProfile.dataValues)))
  }else{
    resp.status(404)
      .json({error: 'Record not found'});
  }
}

module.exports.update_company_profile = async (req,resp) => {
  let id = req.params.id;
  let companyProfileData = req.body;
    let companyProfile = await CompanyProfile.findBy({column: {id: id}})
  if(companyProfile){
    companyProfile.name = companyProfileData.name;
    companyProfile.location = companyProfileData.location;
    companyProfile.description = companyProfileData.description;
    companyProfile.contactInfomation = companyProfileData.contactInfomation;
    companyProfile.save()
    .then(cp => {
      resp.json({success: true})
    })
    .catch(e =>{
      resp.json({success: false,error: e})
    })
  }else{
    resp.status(404)
      .json({error: 'Record not found'});
  }
}