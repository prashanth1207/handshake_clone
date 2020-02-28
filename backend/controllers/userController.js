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
        errorMessage: 'All fields are mandatory' 
      })
  }
  let user = await User.findBy({column: {emailId: emailId}});
  let errorMessage = 'Invalid email id or password';
  if (!user || !user.is_password_valid(password)){
    return res.json({
      success: false,
      errorMessage: errorMessage 
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
        errorMessage: 'All fields are mandatory' 
      })
  }
  req.body.userData
  let userData = req.body.userData;
  let profileData = req.body.profileData
  let user = await User.findBy({emailId: userData.emailId});
  if(user){
    return res.json({
      success: false,
      errorMessage: 'EmailId already exists' 
    })
  }
  sequelize.transaction(async() => {
    User.create(userData).then(async new_user => {
        let profileKlass = eval(new_user.role + 'Profile')
        return await profileKlass.create(Object.assign({},profileData,{userId: new_user.id}))
    }).then( profile =>{
      let sessionStorageInfo = {
        id: user.id,
        type: user.role,
        profile: profile.dataValues
      };
      return res.json({
        success: true,
        userInfo: sessionStorageInfo
      })
    }).catch(e =>{
      return res.json({
        success: false,
        errorMessage: e.errors[0].message
      })
    });
  });
}