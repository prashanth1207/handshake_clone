let mongoose = require('mongoose');
let CompanyProfile = mongoose.model('CompanyProfile');
const formidable = require('formidable');
let fs = require('fs');
let kafka = require('./../kafka/client')

module.exports.get_company_profile = async (req,resp) => {
  req.params.path = 'get_company_profile';
  kafka.make_request('companyProfile',{params: req.params},function(err,result){
    if(result.error){
      resp.status(404).json({error: 'Record not found'});
    }else{
      resp.json(result)
    }
  })
}
  
module.exports.update_company_profile = async (req,res) => {
  req.params.path = 'update_company_profile';
  new formidable.IncomingForm().parse(req,async (err,fields,files) =>{
    if(err){
      return res.json({
        success: false,
        error: err
      });
    }
    kafka.make_request('companyProfile',{body: req.body,params: req.params, fields: fields},function(err,result){
      if(result){
        return res.json({
          success: false,
          error: err
        })
      }else{
        let companyLogo = files.companyLogo;
        if(companyLogo){
          fs.renameSync(companyLogo.path,__basedir+`/public/images/profile_pics/${result.user}.png`)
        }
        return res.json({
          success: true,
        })
      }
    })
  })
}