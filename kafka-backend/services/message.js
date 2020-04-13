let mongoose = require('mongoose');
let MessageWindow = mongoose.model('MessageWindow');
let CompanyProfile = mongoose.model('CompanyProfile');
let StudentProfile = mongoose.model('StudentProfile');

async function handle_request(msg, callback) {
  console.log(msg);
  if(msg.params.path === 'startConversation'){
    try{
      MessageWindow.createNewRecord(msg.body).then(messageWindow => {
        callback(null,{
          success: true,
          data: messageWindow
        })
      });
    }catch(error){
      console.log(error);
      callback(null,{
        success: false,
        error: error.message
      })
    }
  }
  
  if(msg.params.path === 'getMessageWindow'){
    MessageWindow.findById(msg.params.id)
    .populate('initiator')
    .populate('receiver')
    .then(messageWindow =>{
      callback(null,messageWindow);
    });
  }
  
  if(msg.params.path === 'sendMessage'){
    let messageWindowId = msg.body.windowId;
    let creatorId = msg.body.creatorId;
    let message = msg.body.message;
    MessageWindow.findOne({_id: messageWindowId}).then(messageWindow =>{
      if(messageWindow){
        messageWindow.messages.push({
          creatorId: creatorId,
          message: message
        });
        messageWindow.save().then(messageWindow =>{
          callback(null,{
            messages: messageWindow.messages
          });
        }).catch(error => {
          callback(null,{
            success: false,
            error: error.message
          })
        })
      }else{
        callback(null,{
          success: false,
          error: 'message window does not exist'
        })
      }
    })
  }
  
  if(msg.params.path === 'getMessageWindows'){
    let id =  msg.params.id
    eval(msg.profile).findOne({_id: id})
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
        callback(null,{profile: profile});
      }else{
        callback(null,{error: 'No Profile Found'});
      }
    })
  }
  if(msg.params.path === 'converstionWindow'){
    MessageWindow.findOne({initiator: {$in: [msg.body.initiator,msg.body.receiver]},receiver: {$in: [msg.body.initiator,msg.body.receiver]}}).then(window =>{
      callback(null,{window: window});
    }).catch(err => {
      callback(null,{error: err});
    })
  }
}

exports.handle_request = handle_request;

