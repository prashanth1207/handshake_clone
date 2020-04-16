let kafka = require('./../kafka/client')

module.exports.createOrUpdateExperienceDetail = (req,resp) =>{
  req.params.path = 'createUpdateExperienceDetails';
  kafka.make_request('experienceDetail',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      return resp.json({success: false, error: result.error})
    }else{
      resp.json({success: true,data: result})
    }
  })
}

module.exports.deleteExperienceDetail = async (req, resp) => {
  req.params.path = 'deleteExperienceDetails';
  kafka.make_request('experienceDetail',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      resp.json({success: false, error: result.error});
    }else{
      resp.json({success: true});
    }
  });
}