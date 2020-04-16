let kafka = require('./../kafka/client')


module.exports.show_all_job_postings = async (req,resp) => {
  req.params.path = 'show_all_job_postings';
  kafka.make_request('jobPosting',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

module.exports.get_job_posting = async (req,resp) => {
  req.params.path = 'get_job_posting';
  kafka.make_request('jobPosting',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.status(404).json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

module.exports.create_job_posting = async (req,resp) => {
  req.params.path = 'create_job_posting';
  kafka.make_request('jobPosting',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({success: false, error: result.error})
    }else{
      resp.json({success: true});
    }
  })
}