const mongoose = require('mongoose');
let User = mongoose.model('User');
let StudentProfile = mongoose.model('StudentProfile');
let CompanyProfile =mongoose.model('CompanyProfile');
let createJwtToken = require('./../utility/search').createJwtToken;

function isDataEmpty(data_arr){
  if(!data_arr)
    return true
  return data_arr.some(data =>{
    return ((data || '').trim().length <= 0)
  });
}

module.exports.post_login = async function(req,res){
  let emailId = req.body.emailId;
  let password = req.body.password;
  if (isDataEmpty([emailId,password])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  let user = await User.findOne({emailId: emailId});
  let error = 'Invalid email id or password';
  if (!user || !user.is_password_valid(password)){
    return res.json({
      success: false,
      error: error 
    })
  }
  let profile = await eval(user.role + 'Profile').findOne({user: user._id});
  return res.json({success: true, jwtToken: createJwtToken(user,profile)});
};
module.exports.post_register = async (req,res) =>{

  if(isDataEmpty([...Object.values(req.body.userData),...Object.values(req.body.profileData)])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  req.body.userData
  let userData = req.body.userData;
  let profileData = req.body.profileData
  let user = await User.findOne({emailId: userData.emailId});
  if(user){
    return res.json({
      success: false,
      error: 'EmailId already exists' 
    })
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
    return res.json({
      success: true,
      jwtToken: createJwtToken(user,profile)
    });
  } catch(err) {
    await session.abortTransaction();
    session.endSession();
    return res.json({
      success: false,
      error: err.message
    })
  };
}