
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