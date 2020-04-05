let mongoose = require('mongoose');
let MessageWindow = mongoose.model('MessageWindow');
let CompanyProfile = mongoose.model('CompanyProfile');
let StudentProfile = mongoose.model('StudentProfile');

validParticipants = (params) =>{
  if(params.senderType && params.receiverType){
    validModels = [CompanyProfile.modelName,StudentProfile.modelName];
    if(validModels.includes(params.senderType) && validModels.includes(params.receiverType)){
      return true
    }
  }
  return false;
}

module.exports.startConversation = (req,res) => {
  if(validParticipants(req.body)){
    try{
      MessageWindow.createNewRecord(req.body).then(messageWindow => {
        res.json({
          success: true,
          data: messageWindow
        })
      });
    }catch(error){
      console.log(error);
      res.json({
        success: false,
        error: error.message
      })
    }
  }else{
    res.json({
      success: false,
      error: 'invalid sender or receiver details'
    })
  }
}

module.exports.getMessageWindow = (req,res) =>{
  MessageWindow.findById(req.params.id)
  .populate('initiator')
  .populate('receiver')
  .then(messageWindow =>{
    res.json(messageWindow);
  });
}

module.exports.sendMessage = (req,res) => {
  let messageWindowId = req.body.windowId;
  let creatorId = req.body.creatorId;
  let message = req.body.message;
  MessageWindow.findOne({_id: messageWindowId}).then(messageWindow =>{
    if(messageWindow){
      messageWindow.messages.push({
        creatorId: creatorId,
        message: message
      });
      messageWindow.save().then(messageWindow =>{
        res.json({
          messages: messageWindow.messages
        });
      }).catch(error => {
        res.json({
          success: false,
          error: error.message
        })
      })
    }else{
      res.json({
        success: false,
        error: 'message window does not exist'
      })
    }
  })
}

const getMessageWindows = (profile,req, resp) => {
  let id =  req.params.id
  profile.findOne({_id: id})
  .populate({path: 'messageWindows',populate:{path: 'initiator'}})
  .populate({path: 'messageWindows',populate:{path: 'receiver'}})
  .then(profile => {
    if(profile){
        profile.messageWindows.forEach(window => {
          [window._doc.respondent,window._doc.respondentType] = window.initiator._id.toString() === id ? [window._doc.receiver,window.receiverType] : [window._doc.initiator,window.initiatorType];
          delete window._doc.initiator;
          delete window._doc.initiatorType;
          delete window._doc.receiver;
          delete window._doc.receiverType;
        })
      resp.json({profile: profile});
    }else{
      resp.json({error: 'No Profile Found'});
    }
  })
}

module.exports.getMessageWindowsForStudent = (req, resp) => {
  getMessageWindows(StudentProfile,req,resp)
}

module.exports.getMessageWindowsForCompany = (req, resp) => {
  getMessageWindows(CompanyProfile,req,resp)
}
