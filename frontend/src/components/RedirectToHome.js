import React from 'react';
import { Redirect } from 'react-router-dom';

function RedirectToHome() {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if(userInfo){
    return <Redirect to={`/${userInfo.type}/${userInfo.type}_profile/${userInfo.profile.id}`}/>
  }
}

export default RedirectToHome;