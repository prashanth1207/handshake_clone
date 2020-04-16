let kafka = require('./../kafka/client')

function isDataEmpty(data_arr){
  if(!data_arr)
    return true
  return data_arr.some(data =>{
    return ((data || '').trim().length <= 0)
  });
}

module.exports.post_login = async function(req,res){
  req.params.path = 'post_login';
  let emailId = req.body.emailId;
  let password = req.body.password;
  if (isDataEmpty([emailId,password])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  kafka.make_request('user',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      return res.json({success: false, error: result.error})
    }else{
      res.json({success: true,jwtToken: result})
    }
  })
};
module.exports.post_register = async (req,res) =>{
  if(isDataEmpty([...Object.values(req.body.userData),...Object.values(req.body.profileData)])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  req.params.path = 'post_register';
  kafka.make_request('user',{params: req.params,body: req.body},function(err,result, ...bcd){
    if(result.error){
      return res.json({success: false, error: result.error})
    }else{
      res.json({success: true,jwtToken: result})
    }
  })
}