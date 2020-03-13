let models = require('./../models')
let User = models.User
let StudentProfile = models.StudentProfile;
let CompanyProfile = models.CompanyProfile;
let sequelize = models.sequelize


function isDataEmpty(data_arr){
  if(!data_arr)
    return true
  return data_arr.some(data =>{
    return ((data || '').trim().length <= 0)
  });
}

module.exports.post_login = async (req,res) =>{
  let emailId = req.body.emailId;
  let password = req.body.password;
  if (isDataEmpty([emailId,password])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  let user = await User.findBy({column: {emailId: emailId}});
  let error = 'Invalid email id or password';
  if (!user || !user.is_password_valid(password)){
    return res.json({
      success: false,
      error: error 
    })
  }
  let profile = await eval(user.role + 'Profile').findBy({column:{userId: user.id}})
    let sessionStorageInfo = {
      id: user.id,
      type: user.role,
      profile: profile.dataValues
    };
  return res.json({
    success: true,
    userInfo: sessionStorageInfo
  })
};
module.exports.post_register = async (req,res) =>{

  if (isDataEmpty([...Object.values(req.body.userData),...Object.values(req.body.profileData)])){
      return res.json({
        success: false,
        error: 'All fields are mandatory' 
      })
  }
  req.body.userData
  let userData = req.body.userData;
  let profileData = req.body.profileData
  let user = await User.findBy({column: {emailId: userData.emailId}});
  if(user){
    return res.json({
      success: false,
      error: 'EmailId already exists' 
    })
  }
  try{
    await sequelize.transaction(async(t) => {
      new_user = await User.create(userData, { transaction: t });
      let profileKlass = eval(new_user.role + 'Profile')
      let profile = await profileKlass.create(Object.assign({},profileData,{userId: new_user.id}), { transaction: t })
      let sessionStorageInfo = {
        id: profile.userId,
        type: new_user.role,
        profile: profile
      };
      return res.json({
        success: true,
        userInfo: sessionStorageInfo
      })
    })
  } catch(err) {
    return res.json({
      success: false,
      error: err.message
    })
  };
}