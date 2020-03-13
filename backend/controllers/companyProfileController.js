let models = require('./../models')
let CompanyProfile = models.CompanyProfile;
const formidable = require('formidable');
let fs = require('fs');

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

module.exports.update_company_profile = async (req,res) => {
  let id = req.params.id;
  CompanyProfile.findBy({column: {id: id}})
  .then(companyProfile =>{
    if(!companyProfile){
      return res.json({
        success: false,
        error: 'no record found'
      })
    }
    new formidable.IncomingForm().parse(req,async (err,fields,files) =>{
      if(err){
        res.json({
          success: false,
          error: err
        })
      }
      companyProfile.name = fields.name;
      companyProfile.location = fields.location;
      companyProfile.description = fields.description;
      companyProfile.contactInformation = fields.contactInformation;
      await companyProfile.save().catch(err => {
        return res.json({
          success: false,
          error: err
        })
      })
      let companyLogo = files.companyLogo;
      if(companyLogo){
        fs.renameSync(companyLogo.path,__basedir+`/public/images/profile_pics/${companyProfile.userId}.png`)
      }
      return res.json({
        success: true
      })
    })
  })
}