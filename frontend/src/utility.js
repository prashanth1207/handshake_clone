import axios from 'axios';

export const DEGREES = ['Junior', 'Senior', 'Masters', 'Alumni'];

export const MAJORS = ["Accountancy","Aerospace Engineering","Bioinformatics","Biological Sciences","Biomedical Engineering","Chemical Engineering","Chemistry","Civil Engineering","Computer Engineering","Computer Science","Criminology","Data Analytics","Electrical Engineering","Engineering","Engineering Management","Environmental Studies","Geology","Human Factors/Ergonomics","Industrial and Systems Engineering","Informatics","Interdisciplinary Studies","Justice Studies","Marine Science","Mass Communication","Materials Engineering","Mathematics","Mechanical Engineering","Medical Product Development Management","Meteorology","Nursing","Nutritional Science","Occupational Therapy","Physics","Psychology","Quality Assurance","Recreation","Software Engineering","Statistics","Taxation","Transportation Management"];

export const isLoggedIn = () =>{
  return sessionStorage.getItem('userInfo') ? true : false
}

export const isStudent = () => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if(userInfo && userInfo.type === 'Student'){
    return true;
  }
  return false;
}

export const isCompany = () => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if(userInfo && userInfo.type === 'Company'){
    return true;
  }
  return false;
}

export const storedUserInfo = () => {
  return JSON.parse(sessionStorage.getItem('userInfo'));
};

export function jsonToFormData (inJSON, inTestJSON, inFormData, parentKey) {
  var form_data = inFormData || new FormData();
  var testJSON = inTestJSON || {};
  for ( var key in inJSON ) {
      var constructedKey = key;
      if (parentKey) {
          constructedKey = parentKey + "." + key;
      }

      var value = inJSON[key];
      if (value && value.constructor === {}.constructor) {
          jsonToFormData (value, testJSON, form_data, constructedKey);
      } else {
          form_data.append(constructedKey, inJSON[key]);
          testJSON[constructedKey] = inJSON[key];
      }
  }
  return form_data;
}

export function studentProfileSubmit(formData, studentProfileId) {
  // let formData = {
  //   studentProfile: {
  //     firstName: form.firstName.value,
  //     lastName: form.lastName.value,
  //     currentCollegeName: form.currentCollegeName.value,
  //     city: form.city.value,
  //     state: form.state.value,
  //     country: form.country.value,
  //     careerObjective: form.careerObjective.value,
  //     phoneNumber: form.phoneNumber.value,
  //     skillSet: form.skillSet.value,
  //     dob: form.dob.value,
  //   },
  //   educationDetails: {
  //     id: educationDetails.id,
  //     collegeName: form.collegeName.value,
  //     collegeLocation: form.collegeLocation.value,
  //     degree: form.degree.value,
  //     major: form.major.value,
  //     yearOfPassing: form.yearOfPassing.value,
  //     currentCgpa: form.currentCgpa.value,
  //     highestDegree: true
  //   },
  //   experienceDetails: {
  //     id: experienceDetails.id,
  //     companyName: form.companyName.value,
  //     title: form.title.value,
  //     companyLocation: form.companyLocation.value,
  //     startDate: form.startDate.value,
  //     endDate: form.endDate.value,
  //     workDescription: form.workDescription.value
  //   }
  // }
  axios.defaults.withCredentials = false;
  return axios.post(`http://localhost:3001/student_profile/${studentProfileId}`,formData)
    .then(resp => {
      return resp
    });
}