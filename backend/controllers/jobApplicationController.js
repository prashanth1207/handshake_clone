const formidable = require('formidable')
let fs = require('fs');
let searchableQuery = require('./../utility/search').searchableQuery;
let kafka = require('./../kafka/client')

module.exports.getApplicationStatus = async (req, res) => {
  req.params.path = 'getApplicationStatus';
  kafka.make_request('jobApplication',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      return res.json({error: result.error})
    }else{
      res.json({status: result});
    }
  })
};

module.exports.setApplicationStatus = async (req, res) => {
  req.params.path = 'setApplicationStatus';
  kafka.make_request('jobApplication',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      return res.json({success: false, error: result.error})
    }else{
      res.json({success: true})
    }
  })
}

module.exports.create_job_application = async (req, res) =>{ 
  req.params.path = 'create_job_application';
  new formidable.IncomingForm().parse(req,async (err,fields,files) =>{
    if(err){
      res.json({
        success: false,
        error: err
      })
    }
    let resume = files.resume;
    kafka.make_request('jobApplication',{params: req.params,body: req.body,fields: fields},function(err,result){
      if(result.error){
        return res.json({success: false, error: result.error})
      }else{
        fs.renameSync(resume.path,__basedir+'/public/resume/'+result.resumePath)
        res.json({success: true,data: result})
      }
    })
  }).catch(e =>{
    res.json({
      success: false,
      error: error
    })
  });
}

module.exports.get_job_applications_for_a_job_posting = (req, res) =>{
  req.params.path = 'get_job_applications_for_a_job_posting';
  kafka.make_request('jobApplication',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return res.json({error: result.error})
    }else{
      res.json({data: result})
    }
  })
}

module.exports.get_job_applications_for_a_student = async (req, res) =>{
  req.params.path = 'get_job_applications_for_a_student';
  kafka.make_request('jobApplication',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return res.json({error: result.error})
    }else{
      res.json(result);
    }
  })
}