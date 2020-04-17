const formidable = require('formidable')
let fs = require('fs');
let kafka = require('./../kafka/client')

module.exports.get_all_students_profile = async (req,resp) =>{
  req.params.path = 'get_all_students_profile';
  kafka.make_request('studentProfile',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

module.exports.get_student_profile = async (req,resp) => {
  req.params.path = 'get_student_profile';
  kafka.make_request('studentProfile',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
};

module.exports.update_student_profile = async(req,resp) => {
  req.params.path = 'update_student_profile';
  kafka.make_request('studentProfile',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
};

module.exports.upload_profile_pic = (req, resp) =>{
  req.params.path = 'upload_profile_pic';
  try {
    new formidable.IncomingForm().parse(req,(err,_fields,files) =>{
      if(err){
        res.json({
          success: false,
          error: err
        })
      }
      kafka.make_request('studentProfile',{params: req.params,body: req.body,query: req.query},function(err,result){
        if(result.error){
          return resp.json({error: result.error})
        }else{
          let profilePic = files.profilePic;
          if(profilePic){
            fs.renameSync(profilePic.path,__basedir+`/public/images/profile_pics/${result.user}.png`)
            return resp.json({
              success: true
            })
          }else{
            resp.json({
              success: false,
              error: "No picture uploaded"
            })
          }
        }
      })
    });
  }catch(error){
    resp.json({
      success: false,
      error: error.message
    })
  }
}