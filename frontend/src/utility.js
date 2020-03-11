import axios from 'axios';

export const DEGREES = ['Junior', 'Senior', 'Masters', 'Alumni'];

export const MAJORS = ['Accountancy', 'Aerospace Engineering', 'Bioinformatics', 'Biological Sciences', 'Biomedical Engineering', 'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 'Criminology', 'Data Analytics', 'Electrical Engineering', 'Engineering', 'Engineering Management', 'Environmental Studies', 'Geology', 'Human Factors/Ergonomics', 'Industrial and Systems Engineering', 'Informatics', 'Interdisciplinary Studies', 'Justice Studies', 'Marine Science', 'Mass Communication', 'Materials Engineering', 'Mathematics', 'Mechanical Engineering', 'Medical Product Development Management', 'Meteorology', 'Nursing', 'Nutritional Science', 'Occupational Therapy', 'Physics', 'Psychology', 'Quality Assurance', 'Recreation', 'Software Engineering', 'Statistics', 'Taxation', 'Transportation Management'];

export const isLoggedIn = () => !!sessionStorage.getItem('userInfo');

export const isStudent = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if (userInfo && userInfo.type === 'Student') {
    return true;
  }
  return false;
};

export const isCompany = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if (userInfo && userInfo.type === 'Company') {
    return true;
  }
  return false;
};

export const storedUserInfo = () => JSON.parse(sessionStorage.getItem('userInfo'));

export function studentProfileSubmit(formData, studentProfileId) {
  axios.defaults.withCredentials = false;
  return axios.post(`http://localhost:3001/student_profile/${studentProfileId}`, formData)
    .then((resp) => resp);
}
