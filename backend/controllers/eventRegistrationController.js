let kafka = require('./../kafka/client')


module.exports.create_registration = async (req,res) => {
  req.params.path = 'createRegistrations';
  kafka.make_request('eventRegistration',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      res.json({
        success: false,
        errror: result.error
      })
    }else{
      res.json({success: true});
    }
  });
}

module.exports.is_student_registered = (req,resp) => {
  req.params.path = 'is_student_registered';
  kafka.make_request('eventRegistration',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      resp.json({err: result.error})
    }else{
        resp.json({
          registered: result
        })
    }
  });
}

module.exports.get_registrations = (req,res) => {
  req.params.path = 'get_registrations';
  kafka.make_request('eventRegistration',{params: req.params,body: req.body, query: req.query},function(err,result){
    if(result.error){
      resp.json({error: result.error})
    }else{
      res.json({
        data: result
      });
    }
  });
}