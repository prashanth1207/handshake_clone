let kafka = require('./../kafka/client')

validParticipants = (params) =>{
  if(params.senderType && params.receiverType){
    validModels = [CompanyProfile.modelName,StudentProfile.modelName];
    if(validModels.includes(params.senderType) && validModels.includes(params.receiverType)){
      return true
    }
  }
  return false;
}

module.exports.startConversation = (req,resp) => {
  req.params.path = 'startConversation';
  if(validParticipants(req.body)){
    kafka.make_request('message',{params: req.params,body: req.body,query: req.query},function(err,result){
      if(result.error){
        return resp.json({success: false, error: result.error})
      }else{
        resp.json(result);
      }
    })
  }else{
    res.json({
      success: false,
      error: 'invalid sender or receiver details'
    })
  }
}

module.exports.getMessageWindow = (req,resp) =>{
  req.params.path = 'getMessageWindow';
  kafka.make_request('message',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

module.exports.sendMessage = (req,resp) => {
  req.params.path = 'sendMessage';
  kafka.make_request('message',{params: req.params,body: req.body,query: req.query},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

const getMessageWindows = (profile,req, resp) => {
  req.params.path = 'getMessageWindows';
  kafka.make_request('message',{params: req.params,body: req.body,profile: profile},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}

module.exports.getMessageWindowsForStudent = (req, resp) => {
  getMessageWindows('StudentProfile',req,resp)
}

module.exports.getMessageWindowsForCompany = (req, resp) => {
  getMessageWindows('CompanyProfile',req,resp)
}

module.exports.converstionWindow = (req,resp) => {
  req.params.path = 'converstionWindow';
  kafka.make_request('message',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      return resp.json({error: result.error})
    }else{
      resp.json(result);
    }
  })
}
