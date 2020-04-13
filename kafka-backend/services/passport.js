const User = require('../models/user');

function handle_request(msg, callback) {
  var res = {};

  User.findOne({_id: msg},(err, user) => {
    if(err){
      callback(err, false);
    }
    if(user){
      callback(null,user);
    }
    else{
      callback(null,false);
    }
  })
};

exports.handle_request = handle_request;