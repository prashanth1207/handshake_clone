let mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let EducationDetail = mongoose.model('EducationDetail');
let ExperienceDetail = mongoose.model('ExperienceDetail');
let searchableQuery =  require('./../utility/search').searchableQuery;
const formidable = require('formidable')
let fs = require('fs');
async function handle_request(msg, callback) {
  if(msg.params.path === 'get_all_students_profile'){
    let query_params = msg.query;
    let page = parseInt(query_params.page || 1) - 1;
    let perPage = parseInt(query_params.perPage || 10);
    delete query_params.page;
    delete query_params.perPage;
    let educationDetails_query = query_params.educationDetails || null;
    delete query_params.educationDetails;
    let studentProfileQuery = searchableQuery(query_params);
    let educationDetailsQuery = searchableQuery(JSON.parse(educationDetails_query));
    try{
      let totalRecordCount = await StudentProfile.find(studentProfileQuery).count();
      StudentProfile.find(studentProfileQuery)
      .populate('educationDetails')
      .populate('experienceDetails')
      .skip(page > -1 ? page*perPage : 0)
      .limit(perPage)
      .then(studentProfiles =>{
        if(Object.keys(educationDetailsQuery).length > 0) {
          studentProfiles = studentProfiles.filter(profile =>{
            let educationDetail = profile.educationDetails[0];
            if(!educationDetail){
              return false;
            }
            let match = false;
            for(let [col_name,col_val] of Object.entries(educationDetailsQuery)){
              match = educationDetail[col_name].match(col_val.$regex);
            }
            return match;
          });
        }
        return callback(null, {totalRecordCount: totalRecordCount, data: studentProfiles});
      }).catch(e => {
        return callback(null, {error: e})
      })
    }catch(error){
      console.log(error);
      callback(null, {error: 'Something went wrong'});
    }
  }
  
  if(msg.params.path === 'get_student_profile'){
    let id = msg.params.id;
    let studentProfile = await StudentProfile.findById(id)
      .populate('educationDetails').populate('experienceDetails');
    if(studentProfile){
      callback(null, studentProfile)
    }else{
      callback({error: 'Record not found'});
    }
  };

  if(msg.params.path === 'update_student_profile'){
    let id = msg.params.id;
    let studentProfile = await StudentProfile.findById(id);
    if(studentProfile){
      try{
        let educationDetailsData = msg.body.educationDetails;
        if(educationDetailsData){
          educationDetailsData.studentProfile = id;
          await EducationDetail.createOrUpdate(educationDetailsData);
        }
        let studentProfileData = msg.body.studentProfile;
        if(studentProfileData){
          await studentProfile.update(studentProfileData);
        }
        return callback(null, {success: true});
      }catch(error){
        callback(null, {
          success: false,
          error: error.message
        })
      }
    }else{
      callback({error: 'Record not found'});
    }
  };
  
  if(msg.params.path === 'upload_profile_pic'){
    StudentProfile.findById(msg.params.id).then(studentProfile =>{
      if(!studentProfile){
        return callback(null, {
          success: false,
          error: 'no record found'
        })
      }else{
        return callback(null, studentProfile)
      }
    })
  
  }
}

exports.handle_request = handle_request;
