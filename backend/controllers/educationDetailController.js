let kafka = require('./../kafka/client')

module.exports.createOrUpdateEducationDetail = (req,resp) =>{
  req.params.path = 'createUpdateEducationDetails';
  kafka.make_request('educationDetail',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      resp.json({success: false, error: result.error})
    }else{
      resp.json({success: true,data: result})
    }
  });
}

module.exports.deleteEducationDetail = async (req, resp) => {
  req.params.path = 'deleteEducationDetails';
  kafka.make_request('educationDetail',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      resp.json({success: false, error: result.error})
    }else{
      resp.json({success: true,data: result})
    }
  });
}