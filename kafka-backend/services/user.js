const mongoose = require('mongoose');
let User = mongoose.model('User');
let StudentProfile = mongoose.model('StudentProfile');
let CompanyProfile = mongoose.model('CompanyProfile');
let createJwtToken = require('./../utility/search').createJwtToken;

async function handle_request(msg, callback) {
  if(msg.params.path === 'post_login'){
    let emailId = msg.body.emailId;
    let password = msg.body.password;
    let user = await User.findOne({emailId: emailId});
    let error = 'Invalid email id or password';
    if (!user || !user.is_password_valid(password)){
      return callback(null,{error:error});
    }
    let profile = await eval(user.role + 'Profile').findOne({user: user._id});
    callback(null,createJwtToken(user,profile));
  };

  if(msg.params.path === 'post_register'){
    let userData = msg.body.userData;
    let profileData = msg.body.profileData
    let user = await User.findOne({emailId: userData.emailId});
    if(user){
      console.log('coming here');
      return callback(null,{error: 'EmailId already exists'});
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      let user = new User(userData)
      await user.save(session);
      let profileKlass = eval(user.role + 'Profile');
      let profile = new profileKlass(Object.assign({},profileData,{user: user._id}));
      await profile.save(session);
      await session.commitTransaction();
      session.endSession();
      return callback(null,createJwtToken(user,profile));
    } catch(err) {
      await session.abortTransaction();
      session.endSession();
      return callback(null,{error: err.message});
    };
  }
}
exports.handle_request = handle_request;

