import React from 'react';

function RedirectToProfile(props) {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if(userInfo){
    return <Redirect to={`/${userInfo.type}/${userInfo.type}_profile/${userInfo.profile.id}`}/>
  }
}

export default RedirectToProfile;